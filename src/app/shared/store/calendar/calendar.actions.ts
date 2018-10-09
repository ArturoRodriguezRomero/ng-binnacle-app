import { HttpErrorResponse } from '@angular/common/http';

export class SetSelectedDate {
  static readonly type = '[calendar store] Set Selected Date';
  constructor(public date: Date) {}
}

export class GetImputedDaysByDatesRequest {
  static readonly type = '[calendar store] Get Imputed Days By Dates Request';
  constructor(public startDate: Date, public endDate: Date) {}
}

export class GetImputedDaysByDatesSuccess {
  static readonly type = '[calendar store] Get Imputed Days By Dates Success';
  constructor(public days: string[]) {}
}

export class GetImputedDaysByDatesError {
  static readonly type = '[calendar store] Get Imputed Days By Dates Error';
  constructor(public error: HttpErrorResponse) {}
}
