import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store, Select } from '@ngxs/store';
import { GetActivitiesByDatesRequest } from '../../../../shared/store/activities/activities.actions';
import { Observable } from 'rxjs';
import { ActivitiesStateModel } from '../../../../shared/store/activities/activities.state';
import { startOfMonth, endOfMonth, isSameMonth } from 'date-fns';
import {
  SetSelectedDate,
  GetImputedDaysByDatesRequest
} from '../../../../shared/store/calendar/calendar.actions';
import { CalendarStateModel } from 'src/app/shared/store/calendar/calendar.state';
import { GetHolidaysRequest } from 'src/app/shared/store/holidays/holidays.actions';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  @Select(state => state.activities)
  activitiesState$: Observable<ActivitiesStateModel>;

  @Select(state => state.calendar)
  calendarState$: Observable<CalendarStateModel>;

  @ViewChild('monthButtonLabel')
  monthButtonLabel: ElementRef;

  isCalendarMenuDeployed: boolean = false;

  constructor(public store: Store) {}

  ngOnInit() {
    this.subscribeToSelectedDateChanged();
    this.setSelectedDateToCurrentDate();
    this.store.dispatch(new GetHolidaysRequest());
  }

  toggleCalendarMenu() {
    this.isCalendarMenuDeployed = !this.isCalendarMenuDeployed;
  }

  setSelectedDateToCurrentDate() {
    const selectedDate = new Date();
    this.store.dispatch(new SetSelectedDate(selectedDate));
  }

  subscribeToSelectedDateChanged() {
    this.store
      .select(state => state.calendar.selectedDate)
      .subscribe(selectedDate => {
        console.log(selectedDate);
        this.onSelectedDateChanged(selectedDate);
      });
  }

  onSelectedDateChanged(selectedDate: Date) {
    const firstDate = startOfMonth(selectedDate);
    const lastDate = endOfMonth(selectedDate);

    this.store.dispatch(new GetActivitiesByDatesRequest(firstDate, lastDate));
    this.store.dispatch(new GetImputedDaysByDatesRequest(firstDate, lastDate));
  }

  changeSelectedDate(newDate: Date) {
    this.store
      .selectOnce(state => state.calendar.selectedDate)
      .subscribe(selectedDate => {
        if (!isSameMonth(selectedDate, newDate)) {
          this.store.dispatch(new SetSelectedDate(newDate));
        }

        this.isCalendarMenuDeployed = false;
      });
  }
}
