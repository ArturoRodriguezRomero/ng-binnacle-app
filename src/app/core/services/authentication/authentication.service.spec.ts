import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import { HttpClient } from '@angular/common/http';

describe('Authentication Service', () => {
  let authenticationService: AuthenticationService;
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
    authenticationService = TestBed.get(AuthenticationService);
  });

  it('should be created', () => {
    expect(authenticationService).toBeTruthy();
  });
});
