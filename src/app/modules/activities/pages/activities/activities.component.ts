import { Component, OnInit } from '@angular/core';
import { toDate } from 'date-fns/esm';
import { Store, Select } from '@ngxs/store';
import { GetActivitiesByDatesRequest } from '../../../../shared/store/activities/activities.actions';
import { Observable } from 'rxjs';
import { ActivitiesStateModel } from '../../../../shared/store/activities/activities.state';
import { startOfMonth, endOfMonth } from 'date-fns';
import {
  SetSelectedDate,
  GetImputedDaysByDatesRequest
} from '../../../../shared/store/calendar/calendar.actions';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.css']
})
export class ActivitiesComponent implements OnInit {
  @Select(state => state.activities)
  activitiesState$: Observable<ActivitiesStateModel>;

  constructor(private store: Store) {}

  ngOnInit() {
    const firstDate = startOfMonth(new Date('2018-09-1'));
    const lastDate = endOfMonth(new Date('2018-09-1'));
    this.store.dispatch(new GetActivitiesByDatesRequest(firstDate, lastDate));
    this.store.dispatch(new SetSelectedDate(new Date()));
    this.store.dispatch(
      new GetImputedDaysByDatesRequest(
        new Date('2018-09-1'),
        new Date('2018-10-9')
      )
    );
  }
}
