import { of } from 'rxjs';

export const holidaysServiceStub = {
  endpoint: 'endpoint',

  getPublicHolidaysByYear(year: number) {
    return of([]);
  },

  getPrivateHolidaysThisYear(year: number) {
    return of([]);
  }
};
