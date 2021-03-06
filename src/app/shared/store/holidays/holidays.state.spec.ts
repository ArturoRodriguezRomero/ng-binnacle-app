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
import { AppRoutingModule } from '../../../app-routing.module';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from '../../../modules/login/pages/login/login.component';
import { ActivitiesComponent } from '../../../modules/activities/pages/activities/activities.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { MonthProgressBarComponent } from '../../../modules/activities/components/month-progress-bar/month-progress-bar.component';
import { DayMobileComponent } from '../../../modules/activities/components/day-mobile/day-mobile.component';
import { ActivityCardMobileComponent } from '../../../modules/activities/components/activity-card-mobile/activity-card-mobile.component';
import { Observable } from 'rxjs';
import { IsSundayPipe } from '../../pipes/is.sunday.pipe/is.sunday.pipe';
import { WeekSeparatorComponent } from 'src/app/modules/activities/components/week-separator/week-separator.component';
import { HoursAndMinutesPipe } from '../../pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { CalculateEndDatePipe } from '../../pipes/calculate.end.date.pipe/calculate.end.date.pipe';
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
import { ActivityPreviewComponent } from 'src/app/modules/activities/components/activity-preview/activity-preview.component';
import { TruncatePipe } from '../../pipes/truncate.pipe/truncate.pipe';
import { LongPressDirective } from '../../directives/long.press.directive/long.press.directive';
import { ActivityFormComponent } from 'src/app/modules/activities/pages/activity-form/activity-form.component';
import { IsMondayPipe } from '../../pipes/is.monday.pipe/is.monday.pipe';
import { TimeFormComponent } from 'src/app/modules/activities/components/time-form/time-form.component';
import { ProjectFormComponent } from 'src/app/modules/activities/components/project-form/project-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { NavigationDrawerComponent } from '../../components/navigation-drawer/navigation-drawer.component';
import { ActivitiesContainerComponent } from 'src/app/modules/activities/pages/activities-container/activities-container.component';

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
        CalendarMenuComponent,
        ActivityPreviewComponent,
        TruncatePipe,
        LongPressDirective,
        ActivityFormComponent,
        IsMondayPipe,
        TimeFormComponent,
        ProjectFormComponent,
        ActivitiesContainerComponent,
        NavigationDrawerComponent
      ],
      imports: [
        CommonModule,
        AppRoutingModule,
        NgxsModule.forRoot([HolidaysState]),
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule
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
