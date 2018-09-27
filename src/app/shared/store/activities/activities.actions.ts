import { Activity } from '../../models/Activity';

export class FetchActivitiesRequest {
  static readonly type = '[activities store] Fetch Activities Request';
  constructor(public date: Date) {}
}

export class FetchActivitiesSuccess {
  static readonly type = '[activities store] Fetch Activities Success';
  constructor(public activities: Activity[]) {}
}

export class FetchActivitiesError {
  static readonly type = '[activities store] Fetch Activities Error';
  constructor(public error: Error) {}
}
