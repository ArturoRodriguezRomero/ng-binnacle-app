import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { startOfMonth, endOfMonth, isSameMonth } from 'date-fns';
import {
  GetActivitiesByDatesRequest,
  GetActivitiesByDatesSuccess
} from './shared/store/activities/activities.actions';
import { GetImputedDaysByDatesRequest } from './shared/store/calendar/calendar.actions';
import { HolidaysStateModel } from './shared/store/holidays/holidays.state';
import { GetHolidaysRequest } from './shared/store/holidays/holidays.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  selectedMonth: Date;

  constructor(public store: Store) {}

  ngOnInit() {
    this.subscribeToSelectedDateChanged();
    this.dispatchGetHolidays();
  }

  subscribeToSelectedDateChanged() {
    this.store
      .select(state => state.calendar.selectedDate)
      .subscribe(selectedDate => {
        this.onSelectedDateChanged(selectedDate);
      });
  }

  onSelectedDateChanged(selectedDate: Date) {
    if (!isSameMonth(selectedDate, this.selectedMonth)) {
      const firstDate = startOfMonth(selectedDate);
      const lastDate = endOfMonth(selectedDate);
      this.store.dispatch(new GetActivitiesByDatesRequest(firstDate, lastDate));
      this.store.dispatch(
        new GetImputedDaysByDatesRequest(firstDate, lastDate)
      );
      this.selectedMonth = selectedDate;
    }
  }

  dispatchGetHolidays() {
    this.store
      .selectOnce(state => state.holidays)
      .subscribe((holidaysState: HolidaysStateModel) => {
        if (holidaysState.publicHolidays.length == 0) {
          this.store.dispatch(new GetHolidaysRequest());
        }
      });
  }
}
