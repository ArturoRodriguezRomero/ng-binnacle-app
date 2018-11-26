import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthenticationResponse } from 'src/app/shared/models/AuthenticationResponse';

describe('AuthorizationInterceptor', () => {
  const authenticationServiceStub = {
    getAuthentication: () => {
      return <AuthenticationResponse>{
        access_token: 'access_token'
      };
    }
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthorizationInterceptor,
          multi: true
        },
        {
          provide: AuthenticationService,
          useValue: authenticationServiceStub
        }
      ]
    })
  );

  it('should add token from #authenticationService to request if headers do not contain Authorization', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      http.get('test').subscribe();

      const request = mock.expectOne(
        req =>
          req.headers.has('Authorization') &&
          req.headers.get('Authorization') === 'Bearer access_token'
      );

      request.flush({ data: 'test' });
      mock.verify();
    }
  ));

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
