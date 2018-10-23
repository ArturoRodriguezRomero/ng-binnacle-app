import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayMobileComponent } from './day-mobile.component';
import { HoursAndMinutesPipe } from 'src/app/shared/pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { ActivityCardMobileComponent } from '../activity-card-mobile/activity-card-mobile.component';
import { CalculateEndDatePipe } from 'src/app/shared/pipes/calculate.end.date.pipe/calculate.end.date.pipe';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { CalendarState } from 'src/app/shared/store/calendar/calendar.state';
import {
  HolidaysState,
  HolidaysStateModel
} from 'src/app/shared/store/holidays/holidays.state';
import { NotifierService } from 'angular-notifier';
import { ActivitiesService } from 'src/app/core/services/activities/activities.service';
import { activitiesServiceStub } from 'src/app/core/services/__mocks__/activities.service.stub';
import { notifierServiceStub } from 'src/app/core/services/__mocks__/notifier.service.stub';
import { ModelsMock } from 'src/app/shared/__mocks__/models.mock';
import { of } from 'rxjs';
import { LongPressDirective } from 'src/app/shared/directives/long.press.directive/long.press.directive';
import { TruncatePipe } from 'src/app/shared/pipes/truncate.pipe/truncate.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { routes } from 'src/app/app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { WeekSeparatorComponent } from '../week-separator/week-separator.component';
import { IsSundayPipe } from 'src/app/shared/pipes/is.sunday.pipe/is.sunday.pipe';
import { MonthProgressBarComponent } from '../month-progress-bar/month-progress-bar.component';
import { CalendarMenuComponent } from '../calendar-menu/calendar-menu.component';
import { ActivityPreviewComponent } from '../activity-preview/activity-preview.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { ActivityFormComponent } from '../../pages/activity-form/activity-form.component';
import { ActivitiesComponent } from '../../pages/activities/activities.component';
import { LoginComponent } from 'src/app/modules/login/pages/login/login.component';

describe('DayMobileComponent', () => {
  let component: DayMobileComponent;
  let fixture: ComponentFixture<DayMobileComponent>;

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
        HttpClientModule,
        NgxsModule.forRoot([CalendarState, HolidaysState]),
        RouterTestingModule.withRoutes(routes),
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: NotifierService,
          useValue: notifierServiceStub
        },
        {
          provide: ActivitiesService,
          useValue: activitiesServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should #getIsPrivateHoliday() and #getIsPublicHoliday() when #ngOnInit', () => {
    spyOn(component, 'getIsPrivateHoliday').and.callThrough();
    spyOn(component, 'getIsPublicHoliday').and.callThrough();

    component.ngOnInit();

    expect(component.getIsPrivateHoliday).toHaveBeenCalled();
    expect(component.getIsPublicHoliday).toHaveBeenCalled();
  });

  it('should return true when #isCurrentDay and #date is the current date', () => {
    component.date = new Date();

    expect(component.isCurrentDay()).toEqual(true, 'it is the current day');
  });

  it('should return true when #isCurrentDay and #date is not the current date', () => {
    component.date = new Date('1977-12-12');

    expect(component.isCurrentDay()).toEqual(false, 'it is the current day');
  });

  it('should set #isPublicHolidays when #getIsPublicHoliday() if #date is in #holidaysState$.publicHolidays', () => {
    const expectedHolidayDay = new Date();
    const holidayStateMock = {
      publicHolidays: [
        ModelsMock.PublicHoliday,
        ModelsMock.PublicHoliday,
        {
          date: expectedHolidayDay
        }
      ]
    };
    component.date = expectedHolidayDay;
    Object.defineProperty(component, 'holidaysState$', { writable: true });
    component.holidaysState$ = of(<HolidaysStateModel>holidayStateMock);
    spyOn(component, 'isPublicHoliday').and.callThrough();

    component.getIsPublicHoliday();

    expect(component.isPublicHoliday).toEqual(
      true,
      '#date is a public holiday'
    );
  });

  it('should set #isPrivateHolidays when #getIsPrivateHoliday if #date is in #holidaysState$.privateHolidays', () => {
    const expectedHolidayDay = new Date();
    const holidayStateMock = {
      privateHolidays: [
        ModelsMock.PrivateHoliday,
        ModelsMock.PrivateHoliday,
        {
          date: expectedHolidayDay
        }
      ]
    };
    component.date = expectedHolidayDay;
    Object.defineProperty(component, 'holidaysState$', { writable: true });
    component.holidaysState$ = of(<HolidaysStateModel>holidayStateMock);
    spyOn(component, 'isPrivateHoliday').and.callThrough();

    component.getIsPrivateHoliday();

    expect(component.isPrivateHoliday).toEqual(
      true,
      '#date is a private holiday'
    );
  });
});
