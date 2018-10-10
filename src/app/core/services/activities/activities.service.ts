import { Injectable } from '@angular/core';
import { Endpoints } from '../endpoints';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../../../shared/models/Activity';

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
}
