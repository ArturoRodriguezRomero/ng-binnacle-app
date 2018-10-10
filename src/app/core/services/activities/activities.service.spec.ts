import { TestBed } from '@angular/core/testing';

import { ActivitiesService } from './activities.service';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../endpoints';

describe('ActivitiesService', () => {
  let activitiesService: ActivitiesService;
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        }
      ]
    });
    activitiesService = TestBed.get(ActivitiesService);
  });

  it('should be created', () => {
    expect(activitiesService).toBeTruthy();
  });

  it('should call #httpClient.get() when #getActivitiesByDates', () => {
    const startDate = new Date('2018-5-5');
    const endDate = new Date('2018-6-6');
    httpClientSpy.get.and.returnValue([]);

    activitiesService.getActivitiesByDates(startDate, endDate);

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      Endpoints.Activities.getByDates(startDate, endDate)
    );
  });

  it('should call #httpClient.get() when #getActivitiesTimeByDates', () => {
    const startDate = new Date('2018-5-5');
    const endDate = new Date('2018-6-6');
    httpClientSpy.get.and.returnValue([]);

    activitiesService.getActivitiesTimeByDates(startDate, endDate);

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      Endpoints.Activities.getActivitiesTimeByDates(startDate, endDate)
    );
  });

  it('should call #httpClient.get() when #getImputedDaysByDates', () => {
    const startDate = new Date('2018-5-5');
    const endDate = new Date('2018-6-6');
    httpClientSpy.get.and.returnValue([]);

    activitiesService.getImputedDaysByDates(startDate, endDate);

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      Endpoints.Activities.getImputedDaysByDates(startDate, endDate)
    );
  });
});
