import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ActivitiesStateModel } from 'src/app/shared/store/activities/activities.state';
import { UserStateModel } from 'src/app/shared/store/user/user.state';
import { PrivateHoliday } from 'src/app/shared/models/PrivateHoliday';
import { PublicHoliday } from 'src/app/shared/models/PublicHoliday';
import { HolidaysStateModel } from 'src/app/shared/store/holidays/holidays.state';
import {
  isSameMonth,
  startOfMonth,
  addDays,
  isBefore,
  endOfMonth,
  isSameDay,
  isAfter,
  isWeekend
} from 'date-fns';
import { ActivityDay } from 'src/app/shared/models/ActivityDay';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-month-progress-bar',
  templateUrl: './month-progress-bar.component.html',
  styleUrls: ['./month-progress-bar.component.css']
})
export class MonthProgressBarComponent implements OnInit {
  @Select(state => state.activities)
  activitiesState$: Observable<ActivitiesStateModel>;

  @Select(state => state.user)
  userState$: Observable<UserStateModel>;

  @Select(state => state.holidays)
  holidaysState$: Observable<HolidaysStateModel>;

  @Select(state => state.calendar.selectedDate)
  selectedDate$: Observable<Date>;

  totalWorkableMinutesThisMonth: number = 0;
  totalWorkableMinutesUntilNow: number = 0;
  totalWorkedMinutes: number = 0;
  minutesDifference: number = 0;

  isSelectedDateInTheFuture: boolean = true;

  constructor(private store: Store) {}

  ngOnInit() {
    this.subscribeToActivitiesChange();
  }

  subscribeToActivitiesChange() {
    this.store.select(state => state.activities.days).subscribe(days => {
      this.store.selectOnce(state => state.user).subscribe(userState => {
        this.store
          .selectOnce(state => state.calendar.selectedDate)
          .subscribe(selectedDate => {
            this.store
              .select(state => state.holidays)
              .pipe(take(3))
              .subscribe(holidaysState => {
                this.updateTotalMinutes(days);

                this.totalWorkableMinutesUntilNow = this.getTotalWorkableMinutesUntilSelectedDate(
                  userState,
                  holidaysState.privateHolidays,
                  holidaysState.publicHolidays,
                  isSameMonth(selectedDate, new Date())
                    ? new Date()
                    : endOfMonth(selectedDate)
                );
                this.totalWorkableMinutesThisMonth = this.getTotalWorkableMinutesUntilSelectedDate(
                  userState,
                  holidaysState.privateHolidays,
                  holidaysState.publicHolidays,
                  endOfMonth(selectedDate)
                );

                this.isSelectedDateInTheFuture = isAfter(
                  selectedDate,
                  endOfMonth(new Date())
                );

                this.updateHoursDifference();
              });
          });
      });
    });
  }

  getTotalWorkableMinutesUntilSelectedDate(
    userState: UserStateModel,
    privateHolidays: Array<PrivateHoliday>,
    publicHolidays: Array<PublicHoliday>,
    selectedDate: Date
  ) {
    const privateHolidaysUntilSelectedDate = this.getPrivateHolidaysUntilSelectedDate(
      privateHolidays,
      selectedDate
    );
    const publicHolidaysUntilSelectedDate = this.getPublicHolidaysUntilSelectedDate(
      publicHolidays,
      selectedDate
    );

    const weekendDaysUntilSelectedDate = this.getWeekendDaysUntilSelectedDate(
      selectedDate
    );

    return (
      (((selectedDate.getDate() -
        publicHolidaysUntilSelectedDate.length -
        privateHolidaysUntilSelectedDate -
        weekendDaysUntilSelectedDate) *
        userState.monthlyHours) /
        userState.workingDays) *
      60
    );
  }

  getPrivateHolidaysUntilSelectedDate(
    privateHolidays: Array<PrivateHoliday>,
    selectedDate: Date
  ): number {
    const monthFirstDay = startOfMonth(selectedDate);
    let totalHolidays = 0;
    for (
      let iterationDay = monthFirstDay;
      isBefore(iterationDay, selectedDate);
      iterationDay = addDays(iterationDay, 1)
    ) {
      const isPrivateHoliday = privateHolidays.some(
        holiday =>
          (isSameDay(iterationDay, holiday.beginDate) ||
            isSameDay(iterationDay, holiday.finalDate) ||
            (isAfter(iterationDay, holiday.beginDate) &&
              isBefore(iterationDay, holiday.finalDate))) &&
          !isWeekend(iterationDay)
      );
      if (isPrivateHoliday) {
        totalHolidays++;
      }
    }
    return totalHolidays;
  }

  getPublicHolidaysUntilSelectedDate(
    publicHolidays: Array<PublicHoliday>,
    selectedDate: Date
  ): Array<PublicHoliday> {
    return publicHolidays.filter(
      holiday =>
        isSameMonth(holiday.date, selectedDate) &&
        isBefore(holiday.date, selectedDate) &&
        !isWeekend(holiday.date)
    );
  }

  getWeekendDaysUntilSelectedDate(selectedDate: Date): number {
    const monthFirstDay = startOfMonth(selectedDate);
    let weekendDays = 0;

    for (
      let iterationDay = monthFirstDay;
      isBefore(iterationDay, selectedDate);
      iterationDay = addDays(iterationDay, 1)
    ) {
      if (isWeekend(iterationDay)) {
        weekendDays++;
      }
    }
    return weekendDays;
  }

  updateTotalMinutes(days: Array<ActivityDay>) {
    const totalActivitiesMinutes = days.reduce(
      (accumulator, day) => (accumulator += day.total_hours),
      0
    );

    this.totalWorkedMinutes = totalActivitiesMinutes;
  }

  updateHoursDifference() {
    this.minutesDifference =
      this.totalWorkedMinutes - this.totalWorkableMinutesUntilNow;
  }
}
