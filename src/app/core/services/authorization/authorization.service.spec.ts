import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { HttpClient } from '@angular/common/http';

describe('AuthorizationService', () => {
  let authorizationService: AuthorizationService;
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
    authorizationService = TestBed.get(AuthorizationService);
  });

  it('should be created', () => {
    expect(authorizationService).toBeTruthy();
  });

  it('should call #httpClient.post() when #checkUser with correct token', () => {
    const credentials = {
      username: 'username',
      password: 'password'
    };
    const expectedToken = btoa(
      credentials.username + ':' + credentials.password
    );
    httpClientSpy.get.and.returnValue({});

    authorizationService.checkUser(credentials);

    expect(httpClientSpy.post).toHaveBeenCalledWith('user', expectedToken);
  });

  it('should set #token when #checkUser and return when #getToken', () => {
    const credentials = {
      username: 'username',
      password: 'password'
    };
    const expectedToken = btoa(
      credentials.username + ':' + credentials.password
    );
    authorizationService.checkUser(credentials);

    expect(authorizationService.getToken()).toEqual(expectedToken);
  });
});
