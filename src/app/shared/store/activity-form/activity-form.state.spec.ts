import { TestBed } from '@angular/core/testing';
import {
  NgxsModule,
  Store,
  Actions,
  ofActionDispatched,
  ofActionSuccessful
} from '@ngxs/store';
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
import { ActivityPreviewComponent } from 'src/app/modules/activities/components/activity-preview/activity-preview.component';
import { TruncatePipe } from '../../pipes/truncate.pipe/truncate.pipe';
import { LongPressDirective } from '../../directives/long.press.directive/long.press.directive';

import {
  ActivityFormComponent,
  ActivityFormValue
} from 'src/app/modules/activities/pages/activity-form/activity-form.component';
import { IsMondayPipe } from '../../pipes/is.monday.pipe/is.monday.pipe';
import { TimeFormComponent } from 'src/app/modules/activities/components/time-form/time-form.component';
import { ProjectFormComponent } from 'src/app/modules/activities/components/project-form/project-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ActivityFormState } from './activity-form.state';
import { HttpClientModule } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { notifierServiceStub } from 'src/app/core/services/__mocks__/notifier.service.stub';
import { ActivitiesService } from 'src/app/core/services/activities/activities.service';
import { OrganizationsService } from 'src/app/core/services/organizations/organizations.service';
import { ProjectsService } from 'src/app/core/services/projects/projects.service';
import { RolesService } from 'src/app/core/services/roles/roles.service';
import { ErrorHandlerService } from 'src/app/core/handlers/error/error-handler.service';
import {
  SetFormDate,
  SetFormActivity,
  SaveActivityRequest,
  SaveActivitySuccess,
  ModifyActivityRequest,
  ModifyActivitySuccess,
  ModifyActivityError,
  DeleteActivityRequest,
  DeleteActivitySuccess,
  DeleteActivityError
} from './activity-form.actions';
import { ModelsMock } from '../../__mocks__/models.mock';

describe('Activity Detail', () => {
  let store: Store;
  let activitiesService: ActivitiesService;
  let organizationsService: OrganizationsService;
  let projectsService: ProjectsService;
  let rolesService: RolesService;
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
        ProjectFormComponent
      ],
      imports: [
        CommonModule,
        AppRoutingModule,
        NgxsModule.forRoot([ActivityFormState]),
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,
        HttpClientModule
      ],
      providers: [
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
    actions$ = TestBed.get(Actions);
    errorHandlerService = TestBed.get(ErrorHandlerService);
    activitiesService = TestBed.get(ActivitiesService);
    organizationsService = TestBed.get(OrganizationsService);
    projectsService = TestBed.get(ProjectsService);
    rolesService = TestBed.get(RolesService);
    errorHandlerService = TestBed.get(ErrorHandlerService);
  });

  it('should patch date when @Action(SetFormDate)', () => {
    const expected = new Date();

    store.dispatch(new SetFormDate(expected));

    store.selectOnce(state => state.activityForm.date).subscribe(date => {
      expect(date).toEqual(expected);
    });
  });

  it('should patch date when @Action(SetFormDate)', () => {
    const expected = ModelsMock.Activity;

    store.dispatch(new SetFormActivity(expected));

    store
      .selectOnce(state => state.activityForm.activity)
      .subscribe(activity => {
        expect(activity).toEqual(expected);
      });
  });

  it('should call #activitiesService.saveNewActivity when @Action(SaveActivityRequest)', () => {
    spyOn(activitiesService, 'saveNewActivity').and.callThrough();

    store.dispatch(new SaveActivityRequest(new ActivityFormValue()));

    expect(activitiesService.saveNewActivity).toHaveBeenCalledWith(
      new ActivityFormValue()
    );
  });

  it('should dispatch @Action SaveActivitySuccess when @Action SaveActivityRequest is successfull', () => {
    const expected = new ActivityFormValue();
    spyOn(activitiesService, 'saveNewActivity').and.callThrough();

    store.dispatch(new SaveActivityRequest(expected));

    actions$
      .pipe(ofActionSuccessful(SaveActivityRequest))
      .subscribe(actions => {
        actions$
          .pipe(ofActionDispatched(SaveActivitySuccess))
          .subscribe(actions => {
            expect(actions).toEqual(true);
          });
      });
  });

  it('should dispatch @Action SaveActivityError when @Action SaveActivityRequest is not successfull', () => {
    const expected = new ActivityFormValue();
    spyOn(activitiesService, 'saveNewActivity').and.throwError(null);

    store.dispatch(new SaveActivityRequest(expected));

    actions$
      .pipe(ofActionSuccessful(SaveActivityRequest))
      .subscribe(actions => {
        actions$
          .pipe(ofActionDispatched(SaveActivitySuccess))
          .subscribe(actions => {
            expect(actions).toEqual(true);
          });
      });
  });

  it('should call #activitiesService.modifyActivity when @Action(ModifyActivityRequest)', () => {
    spyOn(activitiesService, 'modifyActivity').and.callThrough();

    store.dispatch(new ModifyActivityRequest(new ActivityFormValue()));

    expect(activitiesService.modifyActivity).toHaveBeenCalledWith(
      new ActivityFormValue()
    );
  });

  it('should dispatch @Action ModifyActivitySuccess when @Action ModifyActivityRequest is successfull', () => {
    const expected = new ActivityFormValue();
    spyOn(activitiesService, 'modifyActivity').and.callThrough();

    store.dispatch(new ModifyActivityRequest(expected));

    actions$
      .pipe(ofActionSuccessful(ModifyActivityRequest))
      .subscribe(actions => {
        actions$
          .pipe(ofActionDispatched(ModifyActivitySuccess))
          .subscribe(actions => {
            expect(actions).toEqual(true);
          });
      });
  });

  it('should dispatch @Action ModifyActivityError when @Action ModifyActivityRequest is not successfull', () => {
    const expected = new ActivityFormValue();
    spyOn(activitiesService, 'saveNewActivity').and.throwError(null);

    store.dispatch(new ModifyActivityRequest(expected));

    actions$
      .pipe(ofActionSuccessful(ModifyActivityRequest))
      .subscribe(actions => {
        actions$
          .pipe(ofActionDispatched(ModifyActivityError))
          .subscribe(actions => {
            expect(actions).toEqual(true);
          });
      });
  });

  it('should call #activitiesService.deleteActivity when @Action(DeleteActivityRequest)', () => {
    spyOn(activitiesService, 'deleteActivity').and.callThrough();

    store.dispatch(new DeleteActivityRequest(new ActivityFormValue()));

    expect(activitiesService.deleteActivity).toHaveBeenCalledWith(
      new ActivityFormValue()
    );
  });

  it('should dispatch @Action DeleteActivitySuccess when @Action DeleteActivityRequest is successfull', () => {
    const expected = new ActivityFormValue();
    spyOn(activitiesService, 'deleteActivity').and.callThrough();

    store.dispatch(new DeleteActivityRequest(expected));

    actions$
      .pipe(ofActionSuccessful(DeleteActivityRequest))
      .subscribe(actions => {
        actions$
          .pipe(ofActionDispatched(DeleteActivitySuccess))
          .subscribe(actions => {
            expect(actions).toEqual(true);
          });
      });
  });

  it('should dispatch @Action DeleteActivityError when @Action DeleteActivityRequest is not successfull', () => {
    const expected = new ActivityFormValue();
    spyOn(activitiesService, 'deleteActivity').and.throwError(null);

    store.dispatch(new DeleteActivityRequest(expected));

    actions$
      .pipe(ofActionSuccessful(DeleteActivityRequest))
      .subscribe(actions => {
        actions$
          .pipe(ofActionDispatched(DeleteActivityError))
          .subscribe(actions => {
            expect(actions).toEqual(true);
          });
      });
  });
});
