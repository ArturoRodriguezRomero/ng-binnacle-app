import { Activity } from '../../models/Activity';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivityDay } from '../../models/ActivityDay';

export class GetActivitiesByDatesRequest {
  static readonly type = '[activities store] Get Activities By Dates Request';
  constructor(public startDate: Date, public endDate: Date) {}
}

export class GetActivitiesByDatesSuccess {
  static readonly type = '[activities store] Get Activities By Dates Success';
  constructor(public days: ActivityDay[]) {}
}

export class GetActivitiesByDatesError {
  static readonly type = '[activities store] Get Activities By Dates Error';
  constructor(public error: HttpErrorResponse) {}
}

export class UpdateActivity {
  static readonly type = '[activities store] Update Activity';
  constructor(public activity: Activity) {}
}
