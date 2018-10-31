import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { RolesService } from './roles.service';

describe('ActivitiesService', () => {
  let rolesService: RolesService;
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
    rolesService = TestBed.get(RolesService);
  });

  it('should be created', () => {
    expect(rolesService).toBeTruthy();
  });

  it('should call #httpClient.get() when #getByProjectId', () => {
    httpClientSpy.get.and.returnValue([]);

    rolesService.getByProjectId(1);

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      Endpoints.Roles.getByProjectId(1)
    );
  });
});
