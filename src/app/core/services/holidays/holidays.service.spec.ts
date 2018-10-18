import { TestBed } from '@angular/core/testing';

import { HolidaysService } from './holidays.service';
import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../endpoints';

describe('HolidaysService', () => {
  let holidaysService: HolidaysService;
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
    holidaysService = TestBed.get(HolidaysService);
  });

  it('should be created', () => {
    holidaysService = TestBed.get(HolidaysService);
    expect(holidaysService).toBeTruthy();
  });

  it('should call #httpClient.get() when #getPublicHolidaysByYear', () => {
    const year = 1977;

    httpClientSpy.get.and.returnValue([]);

    holidaysService.getPublicHolidaysByYear(year);

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      Endpoints.Holidays.getPublicHolidaysByYear(year)
    );
  });

  it('should call #httpClient.get() when #getPrivateHolidaysThisYear', () => {
    httpClientSpy.get.and.returnValue([]);

    holidaysService.getPrivateHolidaysThisYear();

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      Endpoints.Holidays.getPrivateHolidaysThisYear()
    );
  });
});
