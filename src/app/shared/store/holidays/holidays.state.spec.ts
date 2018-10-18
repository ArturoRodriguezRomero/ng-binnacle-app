import { TestBed } from '@angular/core/testing';
import {
  NgxsModule,
  Store,
  Actions,
  ofActionSuccessful,
  ofActionDispatched,
  ofActionErrored
} from '@ngxs/store';
import { ErrorHandlerService } from '../../../core/handlers/error/error-handler.service';
import { errorHandlerServiceStub } from '../../../core/handlers/__mocks__/error.handler.service.stub';
import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { authorizationServiceStub } from '../../../core/services/__mocks__/authorization.service.stub';
import { AppRoutingModule } from '../../../app-routing.module';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from '../../../modules/login/pages/login/login.component';
import { ActivitiesComponent } from '../../../modules/activities/pages/activities/activities.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { MonthProgressBarComponent } from '../../../modules/activities/components/month-progress-bar/month-progress-bar.component';
import { DayMobileComponent } from '../../../modules/activities/components/day-mobile/day-mobile.component';
import { ActivityCardMobileComponent } from '../../../modules/activities/components/activity-card-mobile/activity-card-mobile.component';
import { AuthorizationGuardService } from '../../../core/services/authorization/authorization.guard.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IsSundayPipe } from '../../pipes/is.sunday.pipe';
import { WeekSeparatorComponent } from 'src/app/modules/activities/components/week-separator/week-separator.component';
import { HoursAndMinutesPipe } from '../../pipes/hours.and.minutes.pipe';
import { CalculateEndDatePipe } from '../../pipes/calculate.end.date.pipe';
import { CalendarMenuComponent } from 'src/app/modules/activities/components/calendar-menu/calendar-menu.component';
import { HolidaysService } from 'src/app/core/services/holidays/holidays.service';
import { HolidaysState, HolidaysStateModel } from './holidays.state';
import { holidaysServiceStub } from 'src/app/core/services/__mocks__/holidays.service.stub';
import {
  GetHolidaysRequest,
  GetHolidaysSuccess,
  GetHolidaysError
} from './holidays.actions';
import { GetActivitiesByDatesError } from '../activities/activities.actions';

describe('Holidays State', () => {
  let store: Store;
  let holidaysService: HolidaysService;
  let errorHandlerService: ErrorHandlerService;

  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        ActivitiesComponent,
        LoadingSpinnerComponent,
        MonthProgressBarComponent,
        DayMobileComponent,
        ActivityCardMobileComponent,
        IsSundayPipe,
        WeekSeparatorComponent,
        HoursAndMinutesPipe,
        CalculateEndDatePipe,
        CalendarMenuComponent
      ],
      imports: [
        CommonModule,
        AppRoutingModule,
        NgxsModule.forRoot([HolidaysState]),
        ReactiveFormsModule
      ],
      providers: [
        AppRoutingModule,
        {
          provide: HolidaysService,
          useValue: holidaysServiceStub
        },
        {
          provide: ErrorHandlerService,
          useValue: errorHandlerServiceStub
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    });
    store = TestBed.get(Store);
    holidaysService = TestBed.get(HolidaysService);
    errorHandlerService = TestBed.get(ErrorHandlerService);
    actions$ = TestBed.get(Actions);
    errorHandlerService = TestBed.get(ErrorHandlerService);
  });

  it('should dispatch @Action(GetHolidaySuccess) when @Action(GetHolidayRequest) is successfull', () => {
    spyOn(holidaysService, 'getPrivateHolidaysThisYear').and.callThrough();
    spyOn(holidaysService, 'getPublicHolidaysByYear').and.callThrough();

    store.dispatch(new GetHolidaysRequest());

    actions$.pipe(ofActionSuccessful(GetHolidaysRequest)).subscribe(actions => {
      actions$
        .pipe(ofActionDispatched(GetHolidaysSuccess))
        .subscribe(actions => {
          expect(actions).toEqual(true);
        });
    });
  });

  it('should dispatch @Action(GetHolidayError) when @Action(GetHolidayRequest) is failed', () => {
    spyOn(holidaysService, 'getPrivateHolidaysThisYear').and.throwError(null);
    spyOn(holidaysService, 'getPublicHolidaysByYear').and.throwError(null);

    store.dispatch(new GetHolidaysRequest());

    actions$
      .pipe(ofActionErrored(GetActivitiesByDatesError))
      .subscribe(actions => {
        actions$
          .pipe(ofActionDispatched(GetHolidaysError))
          .subscribe(actions => {
            expect(actions).toEqual(true);
          });
      });
  });

  it('should patchState when @Action(GetHolidaySuccess)', () => {
    store.dispatch(new GetHolidaysSuccess([], []));

    store
      .selectOnce(state => state.holidays)
      .subscribe((holidaysState: HolidaysStateModel) => {
        expect(holidaysState.loading).toEqual(false);
        expect(holidaysState.publicHolidays).toEqual([]);
        expect(holidaysState.privateHolidays).toEqual([]);
      });
  });

  it('should #errorHandlerService.throw and when @Action GetHolidaysError', () => {
    spyOn(errorHandlerService, 'throw').and.callThrough();

    store.dispatch(new GetHolidaysError(null));

    expect(errorHandlerService.throw).toHaveBeenCalled();
  });
});
