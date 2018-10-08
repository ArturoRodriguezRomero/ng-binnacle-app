import { Component, OnInit } from '@angular/core';
import { toDate } from 'date-fns/esm';
import { Store, Select } from '@ngxs/store';
import { GetActivitiesByDatesRequest } from '../../../../shared/store/activities/activities.actions';
import { Observable } from 'rxjs';
import { ActivitiesStateModel } from '../../../../shared/store/activities/activities.state';

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
    this.store.dispatch(
      new GetActivitiesByDatesRequest(toDate('2018-09-01'), new Date())
    );
  }
}
