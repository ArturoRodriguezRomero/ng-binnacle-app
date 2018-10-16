import { Component, OnInit, Input } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CalendarStateModel } from 'src/app/shared/store/calendar/calendar.state';
import { HolidaysStateModel } from 'src/app/shared/store/holidays/holidays.state';
import { toDate, isAfter, isBefore } from 'date-fns';
import { isSameDay } from 'date-fns/esm';

@Component({
  selector: 'app-day-mobile',
  templateUrl: './day-mobile.component.html',
  styleUrls: ['./day-mobile.component.css']
})
export class DayMobileComponent implements OnInit {
  @Input()
  date: Date;
  @Input()
  activities = [];
  @Input()
  totalHours: number;

  @Select(state => state.calendar)
  calendarState$: Observable<CalendarStateModel>;

  @Select(state => state.holidays)
  holidaysState$: Observable<HolidaysStateModel>;

  isPublicHoliday: boolean = false;
  isPrivateHoliday: boolean = false;

  constructor() {}

  ngOnInit() {
    this.getIsPrivateHoliday();
    this.getIsPublicHoliday();
  }

  isCurrentDay(): boolean {
    return isSameDay(toDate(this.date), new Date());
  }

  getIsPublicHoliday() {
    this.holidaysState$.subscribe((holidayState: HolidaysStateModel) => {
      this.isPublicHoliday = holidayState.publicHolidays.some(holiday =>
        isSameDay(this.date, holiday.date)
      );
    });
  }

  getIsPrivateHoliday() {
    this.holidaysState$.subscribe((holidaysState: HolidaysStateModel) => {
      this.isPrivateHoliday = holidaysState.privateHolidays.some(
        holiday =>
          isSameDay(this.date, holiday.beginDate) ||
          isSameDay(this.date, holiday.finalDate) ||
          (isAfter(this.date, holiday.beginDate) &&
            isBefore(this.date, holiday.finalDate))
      );
    });
  }
}
