import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarMenuComponent } from './calendar-menu.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';
import { HolidaysState } from 'src/app/shared/store/holidays/holidays.state';
import { CalendarState } from 'src/app/shared/store/calendar/calendar.state';
import { NotifierService } from 'angular-notifier';
import { notifierServiceStub } from 'src/app/core/services/__mocks__/notifier.service.stub';
import { of } from 'rxjs';
import { PublicHoliday } from 'src/app/shared/models/PublicHoliday';
import { PrivateHoliday } from 'src/app/shared/models/PrivateHoliday';
import {
  isSameDay,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth
} from 'date-fns';

describe('CalendarMenuComponent', () => {
  let component: CalendarMenuComponent;
  let fixture: ComponentFixture<CalendarMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CalendarMenuComponent, LoadingSpinnerComponent],
      imports: [
        HttpClientModule,
        NgxsModule.forRoot([HolidaysState, CalendarState])
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
    fixture = TestBed.createComponent(CalendarMenuComponent);
    component = fixture.componentInstance;
    component.isDeployed = true;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inits properly', () => {
    spyOn(component, 'getSelectedDateFromState').and.callThrough();
    spyOn(component, 'subscribeToInputedDaysChange').and.callThrough();
    spyOn(component, 'subscribeToHolidaysChange').and.callThrough();

    component.ngOnInit();

    expect(component.getSelectedDateFromState).toHaveBeenCalled();
    expect(component.subscribeToInputedDaysChange).toHaveBeenCalled();
    expect(component.subscribeToHolidaysChange).toHaveBeenCalled();
  });

  it('sets #selectedDate when #getSelectedDateFromState', () => {
    const expectedDate = new Date();
    spyOn(component.store, 'selectOnce').and.returnValue(of(expectedDate));

    component.getSelectedDateFromState();

    expect(component.selectedDate).toEqual(expectedDate);
  });

  it('calls #updateImputedDaysState when #getSelectedDateFromState', () => {
    spyOn(component, 'updateImputedDaysState').and.callThrough();

    component.getSelectedDateFromState();

    expect(component.updateImputedDaysState).toHaveBeenCalled();
  });

  it('calls #updateDaysFromState when #subscribeToImputedDaysChange', () => {
    spyOn(component, 'updateDaysFromState').and.callThrough();

    component.subscribeToInputedDaysChange();

    expect(component.updateDaysFromState).toHaveBeenCalled();
  });

  it('calls #updateDaysFromState when #subscribeToHolidaysChange', () => {
    spyOn(component, 'updateDaysFromState').and.callThrough();

    component.subscribeToHolidaysChange();

    expect(component.updateDaysFromState).toHaveBeenCalled();
  });

  it('should call #renderDays with proper arguments when #updateDaysFromState', () => {
    const selectedDate = new Date('2018-07-15');
    const firstDayOfCalendar = new Date('2018-06-25');
    const lastDayOfCalendar = new Date('2018-08-5');
    const expectedPublicHolidays = [
      { date: new Date('2018-3-1') },
      { date: new Date('2018-7-18') },
      { date: new Date('2018-12-30') }
    ];
    const expectedPrivateHolidays = [
      { beginDate: new Date('2018-01-01'), finalDate: new Date('2018-01-06') },
      { beginDate: new Date('2018-07-05'), finalDate: new Date('2018-07-15') },
      { beginDate: new Date('2018-12-17'), finalDate: new Date('2018-12-31') }
    ];
    const calendarStateMock = {
      imputedDays: ['2018-5-20', '2018-7-02', '2018-7-31']
    };
    const holidaysStateMock = {
      publicHolidays: expectedPublicHolidays,
      privateHolidays: expectedPrivateHolidays
    };
    spyOn(component.store, 'selectOnce').and.returnValues(
      of(calendarStateMock),
      of(holidaysStateMock)
    );
    spyOn(component, 'renderDays').and.callThrough();
    component.selectedDate = selectedDate;
    component.firstDayOfCalendar = firstDayOfCalendar;
    component.lastDayOfCalendar = lastDayOfCalendar;

    component.updateDaysFromState();

    expect(component.renderDays).toHaveBeenCalledWith(
      firstDayOfCalendar,
      lastDayOfCalendar,
      [expectedPublicHolidays[1]],
      [expectedPrivateHolidays[1]],
      calendarStateMock.imputedDays
    );
  });

  it('should add correct days to #days when #renderDays', () => {
    const firstDayOfCalendar = new Date('2018-06-25');
    const lastDayOfCalendar = new Date('2018-08-5');
    const publicHolidays = [<PublicHoliday>{ date: new Date('2018-7-18') }];
    const privateHolidays = [
      <PrivateHoliday>{
        beginDate: new Date('2018-07-31'),
        finalDate: new Date('2018-08-3')
      }
    ];
    const imputedDays = ['2018-07-20', '2018-07-02', '2018-07-31'];
    spyOn(component, 'emptyDays').and.callThrough();
    component.selectedDate = new Date('2018-07-15');

    component.renderDays(
      firstDayOfCalendar,
      lastDayOfCalendar,
      publicHolidays,
      privateHolidays,
      imputedDays
    );

    expect(component.emptyDays).toHaveBeenCalled();

    expect(component.days.length).toEqual(41);
    expect(component.days.filter(day => day.isImputed).length).toEqual(
      3,
      '3 days are imputed'
    );
    expect(component.days.filter(day => day.isCurrentDay).length).toEqual(
      0,
      'no day is the current day'
    );
    expect(
      component.days.filter(day => day.isDateFromDifferentMonth).length
    ).toEqual(10, '10 days are from a different month');
    expect(component.days.filter(day => day.isImputed).length).toEqual(
      3,
      'there are 3 imputed days'
    );
    expect(component.days.filter(day => day.isPrivateHoliday).length).toEqual(
      4,
      '4 days are private holidays'
    );
    expect(component.days.filter(day => day.isPublicHoliday).length).toEqual(
      1,
      '1 day is a private holiday'
    );
  });

  it('emits new selected date when #setSelectedDate', () => {
    const expectedDate = new Date();
    spyOn(component.onDaySelected, 'emit').and.returnValue(null);

    component.setSelectedDate(expectedDate);

    expect(component.onDaySelected.emit).toHaveBeenCalledWith(expectedDate);
  });

  it('emits #onDaySelected on #setSelectedDate', () => {
    const expectedDate = new Date();

    component.onDaySelected.subscribe((date: Date) => {
      expect(date).toEqual(expectedDate, 'expected date');
    });
  });

  it('should remove one month from #selectedDate and #updateImputedDaysState when #goToPreviousMonth', () => {
    component.selectedDate = new Date('2018-2-1');
    spyOn(component, 'updateImputedDaysState').and.callThrough();

    component.goToPreviousMonth();

    expect(component.selectedDate).toEqual(new Date('2018-1-1'));
    expect(component.updateImputedDaysState).toHaveBeenCalled();
  });

  it('should add one month from #selectedDate and #updateImputedDaysState when #goToNextMonth', () => {
    component.selectedDate = new Date('2018-2-1');
    spyOn(component, 'updateImputedDaysState').and.callThrough();

    component.goToNextMonth();

    expect(component.selectedDate).toEqual(new Date('2018-3-1'));
    expect(component.updateImputedDaysState).toHaveBeenCalled();
  });

  it('should update calendar first and last day when #updateCalendarRange', () => {
    component.selectedDate = new Date('2018-3-15');

    component.updateCalendarRange();

    expect(
      isSameDay(
        component.firstDayOfCalendar,
        startOfWeek(startOfMonth(component.selectedDate), {
          weekStartsOn: 1
        })
      )
    ).toEqual(true, 'first day of first week');

    expect(
      isSameDay(
        component.lastDayOfCalendar,
        endOfWeek(endOfMonth(component.selectedDate), {
          weekStartsOn: 1
        })
      )
    ).toEqual(true, 'last day of last week');
  });

  it('should empty #days array when #emptyDays', () => {
    component.emptyDays();

    expect(component.days).toEqual(new Array());
  });

  it('should return first day of first weel when #getFirstDayOfCalendar', () => {
    component.selectedDate = new Date('2018-3-15');
    const expected = new Date('2018-2-26');

    const value = component.getFirstDayOfCalendar();

    expect(value).toEqual(expected);
  });

  it('should return last day of last week when #getFirstDayOfCalendar', () => {
    component.selectedDate = new Date('2018-3-15');
    const expected = endOfWeek(endOfMonth(component.selectedDate), {
      weekStartsOn: 1
    });

    const value = component.getLastDayOfCalendar();

    expect(value).toEqual(expected);
  });
});
