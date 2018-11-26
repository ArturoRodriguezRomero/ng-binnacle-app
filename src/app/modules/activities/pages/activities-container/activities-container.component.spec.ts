import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesContainerComponent } from './activities-container.component';
import { NavigationDrawerComponent } from 'src/app/shared/components/navigation-drawer/navigation-drawer.component';
import { startOfMonth, endOfMonth } from 'date-fns';
import { GetHolidaysRequest } from 'src/app/shared/store/holidays/holidays.actions';
import { GetImputedDaysByDatesRequest } from 'src/app/shared/store/calendar/calendar.actions';
import { GetActivitiesByDatesRequest } from 'src/app/shared/store/activities/activities.actions';
import { of } from 'rxjs';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { LoginComponent } from 'src/app/modules/login/pages/login/login.component';
import { ActivitiesComponent } from '../activities/activities.component';
import { ActivityFormComponent } from '../activity-form/activity-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { ActivityPreviewComponent } from '../../components/activity-preview/activity-preview.component';
import { CalendarMenuComponent } from '../../components/calendar-menu/calendar-menu.component';
import { MonthProgressBarComponent } from '../../components/month-progress-bar/month-progress-bar.component';
import { IsMondayPipe } from 'src/app/shared/pipes/is.monday.pipe/is.monday.pipe';
import { WeekSeparatorComponent } from '../../components/week-separator/week-separator.component';
import { DayMobileComponent } from '../../components/day-mobile/day-mobile.component';
import { TimeFormComponent } from '../../components/time-form/time-form.component';
import { ProjectFormComponent } from '../../components/project-form/project-form.component';
import { CalculateEndDatePipe } from 'src/app/shared/pipes/calculate.end.date.pipe/calculate.end.date.pipe';
import { HoursAndMinutesPipe } from 'src/app/shared/pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe/truncate.pipe';
import { ActivityCardMobileComponent } from '../../components/activity-card-mobile/activity-card-mobile.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { LongPressDirective } from 'src/app/shared/directives/long.press.directive/long.press.directive';
import { NgxsModule } from '@ngxs/store';
import { ActivitiesState } from 'src/app/shared/store/activities/activities.state';
import { CalendarState } from 'src/app/shared/store/calendar/calendar.state';
import { HolidaysState } from 'src/app/shared/store/holidays/holidays.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';

describe('ActivitiesContainerComponent', () => {
  let component: ActivitiesContainerComponent;
  let fixture: ComponentFixture<ActivitiesContainerComponent>;

  const notifierServiceStub = { notify: () => {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivitiesContainerComponent,
        NavigationDrawerComponent,
        LoginComponent,
        ActivitiesComponent,
        ActivityFormComponent,
        LoadingSpinnerComponent,
        ActivityPreviewComponent,
        CalendarMenuComponent,
        MonthProgressBarComponent,
        IsMondayPipe,
        WeekSeparatorComponent,
        DayMobileComponent,
        TimeFormComponent,
        ProjectFormComponent,
        CalculateEndDatePipe,
        HoursAndMinutesPipe,
        TruncatePipe,
        ActivityCardMobileComponent,
        LongPressDirective
      ],
      imports: [
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule,
        NgxsModule.forRoot([ActivitiesState, CalendarState, HolidaysState]),
        HttpClientModule
      ],
      providers: [
        {
          provide: HttpClientModule,
          useClass: HttpClientTestingModule
        },
        {
          provide: NotifierService,
          useValue: notifierServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should dispatch @Action(GetActivitiesByDatesRequest) 
  and @Action(GetImputedDaysByDatesRequest) if new Date is different than #selectedMonth when #State.selectedDate changes`, () => {
    const selectedMonth = new Date('2018-1-1');
    const newSelectedDate = new Date('2018-2-2');

    const expectedFirstDate = startOfMonth(newSelectedDate);
    const expectedLastDate = endOfMonth(newSelectedDate);

    component.selectedMonth = selectedMonth;
    spyOn(component.store, 'select').and.returnValue(of(newSelectedDate));
    spyOn(component.store, 'dispatch').and.callThrough();

    component.subscribeToSelectedDateChanged();

    expect(component.store.dispatch).toHaveBeenCalledTimes(2);
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new GetActivitiesByDatesRequest(expectedFirstDate, expectedLastDate)
    );
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new GetImputedDaysByDatesRequest(expectedFirstDate, expectedLastDate)
    );
    expect(component.selectedMonth).toEqual(newSelectedDate);
  });

  it(`should not dispatch @Action(GetActivitiesByDatesRequest) 
  and @Action(GetImputedDaysByDatesRequest) if new Date equals #selectedMonth when #State.selectedDate changes`, () => {
    const selectedMonth = new Date('2018-1-1');
    const newSelectedDate = new Date('2018-1-2');

    component.selectedMonth = selectedMonth;
    spyOn(component.store, 'select').and.returnValue(of(newSelectedDate));
    spyOn(component.store, 'dispatch').and.callThrough();

    component.subscribeToSelectedDateChanged();

    expect(component.store.dispatch).toHaveBeenCalledTimes(0);
  });

  it('should dispatch @Action(GetHolidaysRequest) if holidayState.public holidays is empty on #OnInit', () => {
    spyOn(component.store, 'selectOnce').and.returnValue(
      of({ publicHolidays: [] })
    );
    spyOn(component.store, 'dispatch').and.callThrough();

    component.ngOnInit();

    expect(component.store.dispatch).toHaveBeenCalledWith(
      new GetHolidaysRequest()
    );
  });

  it('should not dispatch @Action(GetHolidaysRequest) if holidayState.public holidays is not empty on #OnInit', () => {
    spyOn(component.store, 'selectOnce').and.returnValue(
      of({ publicHolidays: ['test', 'test', 'test'] })
    );
    spyOn(component.store, 'dispatch').and.callThrough();

    component.ngOnInit();

    expect(component.store.dispatch).toHaveBeenCalledTimes(0);
  });
});
