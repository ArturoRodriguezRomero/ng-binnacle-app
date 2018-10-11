import { HttpErrorResponse } from '@angular/common/http';
import { PublicHoliday } from '../../models/PublicHoliday';
import { PrivateHoliday } from '../../models/PrivateHoliday';

export class GetHolidaysRequest {
  static readonly type = '[holidays state] Get Holidays Request';
  constructor() {}
}

export class GetHolidaysSuccess {
  static readonly type = '[holidays state] Get Holidays Success';
  constructor(
    public publicHolidays: PublicHoliday[],
    public privateHolidays: PrivateHoliday[]
  ) {}
}

export class GetHolidaysError {
  static readonly type = '[holidays state] Get Holidays Error';
  constructor(public error: HttpErrorResponse) {}
}
