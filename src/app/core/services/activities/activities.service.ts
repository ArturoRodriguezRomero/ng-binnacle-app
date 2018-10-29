import { Injectable } from '@angular/core';
import { Endpoints } from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../../../shared/models/Activity';
import { ActivityFormValue } from 'src/app/modules/activities/pages/activity-form/activity-form.component';

@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  constructor(private http: HttpClient) {}

  getActivitiesByDates(startDate: Date, endDate: Date) {
    return this.http.get<Activity[]>(
      Endpoints.Activities.getByDates(startDate, endDate)
    );
  }

  getActivitiesTimeByDates(startDate: Date, endDate: Date) {
    return this.http.get<number>(
      Endpoints.Activities.getActivitiesTimeByDates(startDate, endDate)
    );
  }

  getImputedDaysByDates(startDate: Date, endDate: Date) {
    return this.http.get<string[]>(
      Endpoints.Activities.getImputedDaysByDates(startDate, endDate)
    );
  }

  saveNewActivity(activity: ActivityFormValue) {
    return this.http.post<Activity>(Endpoints.Activity.addNew(), activity);
  }

  modifyActivity(activity: ActivityFormValue) {
    return this.http.put<Activity>(Endpoints.Activity.modify(), activity);
  }

  deleteActivity(activity: ActivityFormValue) {
    console.warn(Endpoints.Activity.deleteById(activity.id));
    return this.http.delete<any>(Endpoints.Activity.deleteById(activity.id));
  }
}
