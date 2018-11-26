import { TestBed } from '@angular/core/testing';
import {
  Store,
  NgxsModule,
  Actions,
  ofActionSuccessful,
  ofActionDispatched
} from '@ngxs/store';
import { ActivitiesService } from 'src/app/core/services/activities/activities.service';
import { ErrorHandlerService } from 'src/app/core/handlers/error/error-handler.service';
import { ActivitiesState } from './activities.state';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { activitiesServiceStub } from 'src/app/core/services/__mocks__/activities.service.stub';
import {
  GetActivitiesByDatesRequest,
  GetActivitiesByDatesSuccess,
  GetActivitiesByDatesError
} from './activities.actions';
import { LoginComponent } from 'src/app/modules/login/pages/login/login.component';
import { ActivitiesComponent } from 'src/app/modules/activities/pages/activities/activities.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { MonthProgressBarComponent } from 'src/app/modules/activities/components/month-progress-bar/month-progress-bar.component';
import { DayMobileComponent } from 'src/app/modules/activities/components/day-mobile/day-mobile.component';
import { ActivityCardMobileComponent } from 'src/app/modules/activities/components/activity-card-mobile/activity-card-mobile.component';
import { IsSundayPipe } from '../../pipes/is.sunday.pipe/is.sunday.pipe';
import { WeekSeparatorComponent } from 'src/app/modules/activities/components/week-separator/week-separator.component';
import { HoursAndMinutesPipe } from '../../pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { CalculateEndDatePipe } from '../../pipes/calculate.end.date.pipe/calculate.end.date.pipe';
import { NotifierService } from 'angular-notifier';
import { Observable } from 'rxjs';
import { ModelsMock } from '../../__mocks__/models.mock';
import { errorHandlerServiceStub } from 'src/app/core/handlers/__mocks__/error.handler.service.stub';
import { CalendarMenuComponent } from 'src/app/modules/activities/components/calendar-menu/calendar-menu.component';
import { ActivityPreviewComponent } from 'src/app/modules/activities/components/activity-preview/activity-preview.component';
import { LongPressDirective } from '../../directives/long.press.directive/long.press.directive';
import { TruncatePipe } from '../../pipes/truncate.pipe/truncate.pipe';
import { ActivityFormComponent } from 'src/app/modules/activities/pages/activity-form/activity-form.component';
import { IsMondayPipe } from '../../pipes/is.monday.pipe/is.monday.pipe';
import { TimeFormComponent } from 'src/app/modules/activities/components/time-form/time-form.component';
import { ProjectFormComponent } from 'src/app/modules/activities/components/project-form/project-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivitiesContainerComponent } from 'src/app/modules/activities/pages/activities-container/activities-container.component';
import { NavigationDrawerComponent } from '../../components/navigation-drawer/navigation-drawer.component';

describe('ActivitiesState', () => {
  let store: Store;
  let activitiesService: ActivitiesService;
  let errorHandlerService: ErrorHandlerService;

  let actions$: Observable<any>;

  const notifierServiceStub = { notify: () => {} };

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
        LongPressDirective,
        TruncatePipe,
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
        NgxsModule.forRoot([ActivitiesState]),
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule
      ],
      providers: [
        {
          provide: ActivitiesService,
          useValue: activitiesServiceStub
        },
        {
          provide: ErrorHandlerService,
          useValue: errorHandlerServiceStub
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        {
          provide: NotifierService,
          useValue: notifierServiceStub
        }
      ]
    });
    store = TestBed.get(Store);
    activitiesService = TestBed.get(ActivitiesService);
    actions$ = TestBed.get(Actions);
    errorHandlerService = TestBed.get(ErrorHandlerService);
  });

  it('should call #activitiesService.getActivitiesByDates when @Action GetActivitiesByDatesRequest', () => {
    const startDate = new Date('2018-10-1');
    const endDate = new Date('2018-10-31');
    spyOn(activitiesService, 'getActivitiesByDates').and.callThrough();

    store.dispatch(new GetActivitiesByDatesRequest(startDate, endDate));

    expect(activitiesService.getActivitiesByDates).toHaveBeenCalledWith(
      startDate,
      endDate
    );
  });

  it('should dispatch @Action GetActivitiesByDatesSuccess when @Action GetActivitiesByDatesRequest is successful', () => {
    const startDate = new Date('2018-10-1');
    const endDate = new Date('2018-10-31');
    spyOn(activitiesService, 'getActivitiesByDates').and.callThrough();

    store.dispatch(new GetActivitiesByDatesRequest(startDate, endDate));

    actions$
      .pipe(ofActionSuccessful(GetActivitiesByDatesRequest))
      .subscribe(actions => {
        actions$
          .pipe(ofActionDispatched(GetActivitiesByDatesSuccess))
          .subscribe(successActions => {
            expect(successActions).toEqual(true);
          });
      });
  });

  it('should dispatch @Action GetActivitiesByDatesError when @Action GetActivitiesByDatesRequest is successful', () => {
    const startDate = new Date('2018-10-1');
    const endDate = new Date('2018-10-31');
    spyOn(activitiesService, 'getActivitiesByDates').and.throwError('error');

    store.dispatch(new GetActivitiesByDatesRequest(startDate, endDate));

    actions$
      .pipe(ofActionSuccessful(GetActivitiesByDatesRequest))
      .subscribe(actions => {
        actions$
          .pipe(ofActionDispatched(GetActivitiesByDatesError))
          .subscribe(errorActions => {
            expect(errorActions).toEqual(true);
          });
      });
  });

  it('should set #loading = false and #activities when @Action GetActivitiesByDatesSuccess', () => {
    const expectedDays = [
      ModelsMock.ActivityDay,
      ModelsMock.ActivityDay,
      ModelsMock.ActivityDay
    ];

    store.dispatch(new GetActivitiesByDatesSuccess(expectedDays));

    store
      .selectOnce(state => state.days)
      .subscribe(state => {
        expect(state.loading).toEqual(false, 'Is not loading');
        expect(state.activities).toEqual(
          expectedDays,
          'Expected Activities Array'
        );
      });
  });

  it('should set #loading = false and when @Action GetActivitiesByDatesError', () => {
    store.dispatch(new GetActivitiesByDatesError(null));

    store
      .selectOnce(state => state.activities.loading)
      .subscribe(loading => {
        expect(loading).toEqual(false);
      });
  });

  it('should #errorHandlerService.throw and when @Action GetActivitiesByDatesError', () => {
    spyOn(errorHandlerService, 'throw').and.callThrough();

    store.dispatch(new GetActivitiesByDatesError(null));

    expect(errorHandlerService.throw).toHaveBeenCalled();
  });
});
