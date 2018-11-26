import { Component, OnInit, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { CalendarStateModel } from 'src/app/shared/store/calendar/calendar.state';
import { HolidaysStateModel } from 'src/app/shared/store/holidays/holidays.state';
import { toDate, isAfter, isBefore, isWeekend } from 'date-fns';
import { isSameDay } from 'date-fns/esm';
import {
  SetFormDate,
  SetFormActivity
} from 'src/app/shared/store/activity-form/activity-form.actions';
import { Router } from '@angular/router';
import { SetSelectedDate } from 'src/app/shared/store/calendar/calendar.actions';

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

  isPublicHoliday = false;
  isPrivateHoliday = false;
  isWeekend = false;

  constructor(public store: Store, public router: Router) {}

  ngOnInit() {
    this.getIsPrivateHoliday();
    this.getIsPublicHoliday();
    this.getIsWeekend();
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

  getIsWeekend() {
    this.isWeekend = isWeekend(this.date);
  }

  onAddActivity() {
    this.store
      .selectOnce(state => state.activityForm.date)
      .subscribe(date => {
        if (this.date !== date) {
          this.store.dispatch(new SetFormDate(this.date));
          this.store.dispatch(new SetFormActivity(null));
        }
      });
    this.store.dispatch(new SetSelectedDate(new Date(this.date)));

    this.router.navigate(['activities', 'new']);
  }
}
