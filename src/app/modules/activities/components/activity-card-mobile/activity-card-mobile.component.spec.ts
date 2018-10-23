import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCardMobileComponent } from './activity-card-mobile.component';
import { CalculateEndDatePipe } from 'src/app/shared/pipes/calculate.end.date.pipe/calculate.end.date.pipe';
import { HoursAndMinutesPipe } from 'src/app/shared/pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { ModelsMock } from 'src/app/shared/__mocks__/models.mock';
import { Actions, ofActionDispatched, NgxsModule } from '@ngxs/store';
import {
  SetActivityDetail,
  UnsetActivityDetail
} from 'src/app/shared/store/activity-detail/activity-detail.actions';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe/truncate.pipe';
import { LongPressDirective } from 'src/app/shared/directives/long.press.directive/long.press.directive';
import { ActivityDetailState } from 'src/app/shared/store/activity-detail/activity-detail.state';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { LoginComponent } from 'src/app/modules/login/pages/login/login.component';
import { ActivitiesComponent } from '../../pages/activities/activities.component';
import { ActivityFormComponent } from '../../pages/activity-form/activity-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LoginState } from 'src/app/shared/store/login/login.state';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { ActivityPreviewComponent } from '../activity-preview/activity-preview.component';
import { CalendarMenuComponent } from '../calendar-menu/calendar-menu.component';
import { MonthProgressBarComponent } from '../month-progress-bar/month-progress-bar.component';
import { DayMobileComponent } from '../day-mobile/day-mobile.component';
import { IsSundayPipe } from 'src/app/shared/pipes/is.sunday.pipe/is.sunday.pipe';
import { WeekSeparatorComponent } from '../week-separator/week-separator.component';

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
        WeekSeparatorComponent
      ],
      imports: [
        NgxsModule.forRoot([ActivityDetailState]),
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,

        HttpClientTestingModule,
        RouterTestingModule
      ]
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
    actions$
      .pipe(ofActionDispatched(SetActivityDetail))
      .subscribe((action: SetActivityDetail) => {
        expect(action).toBeTruthy();
        expect(action.activity).toEqual(
          component.activity,
          'expected activity'
        );
      });

    component.onLongPress();
  });

  it('should dispatch @Action(Unset Activity Detail #onLongPressEnd', () => {
    actions$.pipe(ofActionDispatched(UnsetActivityDetail)).subscribe(action => {
      expect(action).toBeTruthy();
    });

    component.onLongPressEnd();
  });
});
