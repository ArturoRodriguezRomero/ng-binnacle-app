import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { AuthenticationService } from '../../services/authentication/authentication.service';

describe('AuthorizationInterceptor', () => {
  const authenticationServiceStub = {
    getToken: () => {
      return 'token';
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

  it('should add token from #authenticationService to all requests', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      http.get('test').subscribe(response => expect(response).toBeTruthy());
      const request = mock.expectOne(
        req =>
          req.headers.has('Authorization') &&
          req.headers.get('Authorization') === 'Basic token'
      );

      request.flush({ data: 'test' });
      mock.verify();
    }
  ));

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
