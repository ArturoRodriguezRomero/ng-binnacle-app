import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CalendarStateModel } from 'src/app/shared/store/calendar/calendar.state';
import { addMonths, startOfMonth, startOfWeek, toDate } from 'date-fns/esm';
import { subMonths } from 'date-fns/esm';
import {
  endOfMonth,
  addDays,
  endOfWeek,
  isSameMonth,
  isSameDay,
  format,
  isAfter,
  isBefore
} from 'date-fns';
import { GetImputedDaysByDatesRequest } from 'src/app/shared/store/calendar/calendar.actions';
import { PublicHoliday } from 'src/app/shared/models/PublicHoliday';
import { PrivateHoliday } from 'src/app/shared/models/PrivateHoliday';
import { HolidaysStateModel } from 'src/app/shared/store/holidays/holidays.state';

export interface CalendarDayModel {
  date: Date;
  isDateFromPreviousMonth: boolean;
  isPublicHoliday: boolean;
  isPrivateHoliday: boolean;
  isImputed: boolean;
  isCurrentDay: boolean;
}

@Component({
  selector: 'app-calendar-menu',
  templateUrl: './calendar-menu.component.html',
  styleUrls: ['./calendar-menu.component.css']
})
export class CalendarMenuComponent implements OnInit {
  @Input()
  isDeployed: boolean = false;

  @Output()
  onDaySelected = new EventEmitter<Date>();

  @Select(state => state.calendar)
  calendarState$: Observable<CalendarStateModel>;

  @Select(state => state.holidays)
  holidaysState$: Observable<HolidaysStateModel>;

  days = new Array<CalendarDayModel>();
  selectedDate: Date;

  firstDayOfCalendar: Date;
  lastDayOfCalendar: Date;

  constructor(private store: Store) {}

  ngOnInit() {
    this.store
      .selectOnce(state => state.calendar.selectedDate)
      .subscribe(selectedDate => {
        this.selectedDate = selectedDate;

        this.updateImputedDaysState();
      });
    this.store
      .select(state => state.calendar.imputedDays)
      .subscribe(imputedDays => {
        this.updateDaysFromState();
      });
    this.store.select(state => state.holidays).subscribe(holidaysState => {
      this.updateDaysFromState();
    });
  }

  updateImputedDaysState() {
    this.updateCalendarRange();
    this.store.dispatch(
      new GetImputedDaysByDatesRequest(
        this.firstDayOfCalendar,
        this.lastDayOfCalendar
      )
    );
  }

  updateDaysFromState() {
    this.store.selectOnce(state => state.calendar).subscribe(calendarState => {
      this.store
        .selectOnce(state => state.holidays)
        .subscribe(holidaysState => {
          const publicHolidaysThisMonth = holidaysState.publicHolidays.filter(
            holiday => isSameMonth(holiday.date, this.selectedDate)
          );
          const privateHolidaysThisMonth = holidaysState.privateHolidays.filter(
            (holiday: PrivateHoliday) =>
              isSameMonth(holiday.beginDate, this.selectedDate) ||
              isSameMonth(holiday.finalDate, this.selectedDate)
          );

          this.renderDays(
            this.firstDayOfCalendar,
            this.lastDayOfCalendar,
            publicHolidaysThisMonth,
            privateHolidaysThisMonth,
            calendarState.imputedDays
          );
        });
    });
  }

  renderDays(
    firstDayOfCalendar: Date,
    lastDayOfCalendar: Date,
    publicHolidays: Array<PublicHoliday>,
    privateHolidays: Array<PrivateHoliday>,
    imputedDays: Array<any>
  ) {
    this.emptyDays();

    let iterationDay = firstDayOfCalendar;
    while (iterationDay < lastDayOfCalendar) {
      const date = iterationDay;
      const isDateFromPreviousMonth = !isSameMonth(
        iterationDay,
        this.selectedDate
      );
      const isCurrentDay = isSameDay(iterationDay, new Date());
      const isImputed =
        imputedDays.includes(format(iterationDay, 'y-LL-dd')) &&
        !isDateFromPreviousMonth;

      const isPublicHoliday = publicHolidays.some(holiday =>
        isSameDay(holiday.date, iterationDay)
      );

      const isPrivateHoliday = privateHolidays.some(
        holiday =>
          isSameDay(iterationDay, holiday.beginDate) ||
          isSameDay(iterationDay, holiday.finalDate) ||
          (isAfter(iterationDay, holiday.beginDate) &&
            isBefore(iterationDay, holiday.finalDate))
      );

      this.days.push({
        date,
        isDateFromPreviousMonth,
        isCurrentDay,
        isImputed,
        isPrivateHoliday,
        isPublicHoliday
      });

      iterationDay = addDays(iterationDay, 1);
    }
  }

  setSelectedDate(newSelectedDate: Date) {
    this.onDaySelected.emit(newSelectedDate);
  }

  goToPreviousMonth() {
    this.selectedDate = subMonths(this.selectedDate, 1);
    this.updateImputedDaysState();
  }

  goToNextMonth() {
    this.selectedDate = addMonths(this.selectedDate, 1);
    this.updateImputedDaysState();
  }

  updateCalendarRange() {
    this.firstDayOfCalendar = this.getFirstDayOfCalendar();
    this.lastDayOfCalendar = this.getLastDayOfCalendar();
  }

  emptyDays() {
    this.days = new Array<CalendarDayModel>();
  }

  getFirstDayOfCalendar(): Date {
    return startOfWeek(startOfMonth(this.selectedDate), {
      weekStartsOn: 1
    });
  }

  getLastDayOfCalendar(): Date {
    return endOfWeek(endOfMonth(this.selectedDate), {
      weekStartsOn: 1
    });
  }
}
