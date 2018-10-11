import { Injectable } from '@angular/core';
import { Endpoints } from '../endpoints';
import { PublicHoliday } from 'src/app/shared/models/PublicHoliday';
import { PrivateHoliday } from 'src/app/shared/models/PrivateHoliday';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HolidaysService {
  constructor(private http: HttpClient) {}

  getPublicHolidaysByYear(year: number) {
    return this.http.get<Array<PublicHoliday>>(
      Endpoints.Holidays.getPublicHolidaysByYear(year)
    );
  }

  getPrivateHolidaysThisYear() {
    return this.http.get<Array<PrivateHoliday>>(
      Endpoints.Holidays.getPrivateHolidaysThisYear()
    );
  }
}
