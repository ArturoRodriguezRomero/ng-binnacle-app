import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { Endpoints } from '../endpoints';
import { ProjectsService } from './projects.service';

describe('ActivitiesService', () => {
  let projectsService: ProjectsService;
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
    projectsService = TestBed.get(ProjectsService);
  });

  it('should be created', () => {
    expect(projectsService).toBeTruthy();
  });

  it('should call #httpClient.get() when #getByOrganization', () => {
    httpClientSpy.get.and.returnValue([]);

    projectsService.getByOrganizationId(1);

    expect(httpClientSpy.get).toHaveBeenCalledWith(
      Endpoints.Projects.getByOrganziationId(1)
    );
  });
});
