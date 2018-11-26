import { Endpoints } from './endpoints';

describe('Endpoints', () => {
  it('Activity.getById', () => {
    expect(Endpoints.Activity.getById(1)).toEqual('api/activity/1');
  });

  it('Activities.getByDates', () => {
    const startDate = new Date('2000-1-1');
    const endDate = new Date('2000-2-2');
    expect(Endpoints.Activities.getByDates(startDate, endDate)).toEqual(
      'api/activities?startDate=2000-01-01&endDate=2000-02-02'
    );
  });

  it('Activities.getActivitiesTimeByDates', () => {
    const startDate = new Date('2000-1-1');
    const endDate = new Date('2000-2-2');

    expect(
      Endpoints.Activities.getActivitiesTimeByDates(startDate, endDate)
    ).toEqual(
      'api/activitiesTime?startDate=2000-01-01T00:00:00Z&endDate=2000-02-02T00:00:00Z'
    );
  });

  it('Activities.getImputedDaysByDates', () => {
    const startDate = new Date('2000-1-1');
    const endDate = new Date('2000-2-2');

    expect(
      Endpoints.Activities.getImputedDaysByDates(startDate, endDate)
    ).toEqual(
      'api/imputedDays?startDate=2000-01-01T00:00:00Z&endDate=2000-02-02T00:00:00Z'
    );
  });
});
