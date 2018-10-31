import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCardMobileComponent } from './activity-card-mobile.component';
import { CalculateEndDatePipe } from 'src/app/shared/pipes/calculate.end.date.pipe/calculate.end.date.pipe';
import { HoursAndMinutesPipe } from 'src/app/shared/pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { ModelsMock } from 'src/app/shared/__mocks__/models.mock';
import { Actions, ofActionDispatched, NgxsModule } from '@ngxs/store';
import { SetActivityDetail } from 'src/app/shared/store/activity-detail/activity-detail.actions';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe/truncate.pipe';
import { LongPressDirective } from 'src/app/shared/directives/long.press.directive/long.press.directive';
import { ActivityDetailState } from 'src/app/shared/store/activity-detail/activity-detail.state';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { LoginComponent } from 'src/app/modules/login/pages/login/login.component';
import { ActivitiesComponent } from '../../pages/activities/activities.component';
import { ActivityFormComponent } from '../../pages/activity-form/activity-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { ActivityPreviewComponent } from '../activity-preview/activity-preview.component';
import { CalendarMenuComponent } from '../calendar-menu/calendar-menu.component';
import { MonthProgressBarComponent } from '../month-progress-bar/month-progress-bar.component';
import { DayMobileComponent } from '../day-mobile/day-mobile.component';
import { IsSundayPipe } from 'src/app/shared/pipes/is.sunday.pipe/is.sunday.pipe';
import { WeekSeparatorComponent } from '../week-separator/week-separator.component';
import { IsMondayPipe } from 'src/app/shared/pipes/is.monday.pipe/is.monday.pipe';
import { TimeFormComponent } from '../time-form/time-form.component';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { Activity } from 'src/app/shared/models/Activity';
import {
  SetFormDate,
  SetFormActivity
} from 'src/app/shared/store/activity-form/activity-form.actions';
import { AuthorizationGuardService } from 'src/app/core/services/authorization/authorization.guard.service';

describe('ActivityCardMobileComponent', () => {
  let component: ActivityCardMobileComponent;
  let fixture: ComponentFixture<ActivityCardMobileComponent>;
  let actions$: Actions;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityCardMobileComponent,
        CalculateEndDatePipe,
        HoursAndMinutesPipe,
        TruncatePipe,
        LongPressDirective,
        LoginComponent,
        ActivitiesComponent,
        ActivityFormComponent,
        LoadingSpinnerComponent,
        ActivityPreviewComponent,
        CalendarMenuComponent,
        MonthProgressBarComponent,
        DayMobileComponent,
        IsSundayPipe,
        WeekSeparatorComponent,
        IsMondayPipe,
        TimeFormComponent,
        ProjectFormComponent
      ],
      imports: [
        NgxsModule.forRoot([ActivityDetailState]),
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgSelectModule
      ],
      providers: [AuthorizationGuardService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCardMobileComponent);
    component = fixture.componentInstance;
    component.activity = ModelsMock.Activity;
    fixture.detectChanges();
    actions$ = TestBed.get(Actions);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch @Action(Set Activity Detail) #onLongPress', () => {
    const expectedActivity = <Activity>{ startDate: new Date(), id: 1 };
    component.activity = expectedActivity;
    spyOn(component.store, 'dispatch').and.callThrough();

    component.onLongPress();

    expect(component.store.dispatch).toHaveBeenCalledWith(
      new SetActivityDetail(expectedActivity)
    );
  });

  it('should dispatch @Action(Set Activity Detail) #onClick', () => {
    const expectedActivity = <Activity>{ startDate: new Date(), id: 1 };
    component.activity = expectedActivity;
    spyOn(component.store, 'dispatch').and.callThrough();

    component.onClick();

    expect(component.store.dispatch).toHaveBeenCalledWith(
      new SetFormDate(expectedActivity.startDate)
    );
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new SetFormActivity(expectedActivity)
    );
  });

  it('should navigate to /activities/:id #onClick', () => {
    const expectedActivity = <Activity>{ startDate: new Date(), id: 1 };
    component.activity = expectedActivity;
    spyOn(component.router, 'navigate');

    component.onClick();

    expect(component.router.navigate).toHaveBeenCalledWith([`activities/1`]);
  });
});
