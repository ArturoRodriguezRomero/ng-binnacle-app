import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesComponent } from './activities.component';
import { MonthProgressBarComponent } from '../../components/month-progress-bar/month-progress-bar.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { DayMobileComponent } from '../../components/day-mobile/day-mobile.component';
import { IsSundayPipe } from 'src/app/shared/pipes/is.sunday.pipe/is.sunday.pipe';
import { WeekSeparatorComponent } from '../../components/week-separator/week-separator.component';
import { HoursAndMinutesPipe } from 'src/app/shared/pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { ActivityCardMobileComponent } from '../../components/activity-card-mobile/activity-card-mobile.component';
import { CalculateEndDatePipe } from 'src/app/shared/pipes/calculate.end.date.pipe/calculate.end.date.pipe';
import { NgxsModule, Actions, ofActionDispatched } from '@ngxs/store';
import { ActivitiesState } from 'src/app/shared/store/activities/activities.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotifierService } from 'angular-notifier';
import { CalendarMenuComponent } from '../../components/calendar-menu/calendar-menu.component';
import { SetSelectedDate } from 'src/app/shared/store/calendar/calendar.actions';
import { CalendarState } from 'src/app/shared/store/calendar/calendar.state';
import { of } from 'rxjs';
import { ActivityPreviewComponent } from '../../components/activity-preview/activity-preview.component';
import { LongPressDirective } from 'src/app/shared/directives/long.press.directive/long.press.directive';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe/truncate.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { LoginComponent } from 'src/app/modules/login/pages/login/login.component';
import { ActivityFormComponent } from '../activity-form/activity-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HolidaysState } from 'src/app/shared/store/holidays/holidays.state';
import { IsMondayPipe } from 'src/app/shared/pipes/is.monday.pipe/is.monday.pipe';
import { TimeFormComponent } from '../../components/time-form/time-form.component';
import { ProjectFormComponent } from '../../components/project-form/project-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { endOfMonth } from 'date-fns';

describe('ActivitiesComponent', () => {
  let component: ActivitiesComponent;
  let fixture: ComponentFixture<ActivitiesComponent>;
  let actions$: Actions;

  let notifierServiceStub = { notify: () => {} };

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
        ActivityFormComponent,
        IsMondayPipe,
        TimeFormComponent,
        ProjectFormComponent
      ],
      imports: [
        NgxsModule.forRoot([ActivitiesState, CalendarState, HolidaysState]),
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        FormsModule,
        NgSelectModule
      ],
      providers: [
        {
          provide: NotifierService,
          useValue: notifierServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesComponent);
    component = fixture.componentInstance;
    actions$ = TestBed.get(Actions);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should set #isCalendarMenuDeployed false when it's true", () => {
    component.isCalendarMenuDeployed = true;

    component.toggleCalendarMenu();

    expect(component.isCalendarMenuDeployed).toEqual(false);
  });

  it("should set #isCalendarMenuDeployed true when it's false", () => {
    component.isCalendarMenuDeployed = false;

    component.toggleCalendarMenu();

    expect(component.isCalendarMenuDeployed).toEqual(true);
  });

  it('should dispatch @Action(SetSelectedDate) when #changeSelectedDate and !isSameMonth', () => {
    const selectedDate = new Date('2018-1-1');
    const expectedDate = endOfMonth(selectedDate);
    spyOn(component.store, 'selectOnce').and.returnValue(of(selectedDate));

    actions$.pipe(ofActionDispatched(SetSelectedDate)).subscribe(action => {
      expect(action.date).toEqual(expectedDate, 'expected date');
    });

    component.changeSelectedDate(expectedDate);
  });

  it('should set #isCalendarMenuDeployed = false when #changeSelectedDate', () => {
    const expectedDate = new Date('2018-1-1');
    spyOn(component.store, 'selectOnce').and.returnValue(
      of(new Date('2017-1-1'))
    );

    actions$.pipe(ofActionDispatched(SetSelectedDate)).subscribe(action => {
      expect(component.isCalendarMenuDeployed).toEqual(
        false,
        'calendar menu is not deployed'
      );
    });

    component.changeSelectedDate(expectedDate);
  });
});
