import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { OrganizationsService } from './organizations.service';

describe('ActivitiesService', () => {
  let organziationsService: OrganizationsService;
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
    organziationsService = TestBed.get(OrganizationsService);
  });

  it('should be created', () => {
    expect(organziationsService).toBeTruthy();
  });

  it('should call #httpClient.get() when #getAll', () => {
    httpClientSpy.get.and.returnValue([]);

    organziationsService.getAll();

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      Endpoints.Organizations.getAll()
    );
  });
});
