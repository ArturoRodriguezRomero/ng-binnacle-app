import { Component, OnInit } from '@angular/core';
import { GetActivitiesByDatesRequest } from 'src/app/shared/store/activities/activities.actions';
import { startOfMonth, endOfMonth, isSameMonth } from 'date-fns';
import { GetImputedDaysByDatesRequest } from 'src/app/shared/store/calendar/calendar.actions';
import { HolidaysStateModel } from 'src/app/shared/store/holidays/holidays.state';
import { GetHolidaysRequest } from 'src/app/shared/store/holidays/holidays.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-activities-container',
  templateUrl: './activities-container.component.html',
  styleUrls: ['./activities-container.component.css']
})
export class ActivitiesContainerComponent implements OnInit {
  selectedMonth: Date;

  constructor(public store: Store) {}

  ngOnInit() {
    this.subscribeToSelectedDateChanged();
    this.dispatchGetHolidays();
  }

  subscribeToSelectedDateChanged() {
    this.store
      .select(state => state.calendar.selectedMonth)
      .subscribe(selectedMonth => {
        this.onSelectedDateChanged(selectedMonth);
      });
  }

  onSelectedDateChanged(selectedMonth: Date) {
    if (!isSameMonth(selectedMonth, this.selectedMonth)) {
      const firstDate = startOfMonth(selectedMonth);
      const lastDate = endOfMonth(selectedMonth);
      this.store.dispatch(new GetActivitiesByDatesRequest(firstDate, lastDate));
      this.store.dispatch(
        new GetImputedDaysByDatesRequest(firstDate, lastDate)
      );
      this.selectedMonth = selectedMonth;
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
