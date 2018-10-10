import { of } from 'rxjs';

export const activitiesServiceStub = {
  endpoint: 'endpoint',

  getActivitiesByDates: (startDate: Date, endDate: Date) => {
    return of([]);
  },

  getActivitiesTimeByDates(startDate: Date, endDate: Date) {
    return of([]);
  },

  getImputedDaysByDates(startDate: Date, endDate: Date) {
    return of([]);
  }
};
