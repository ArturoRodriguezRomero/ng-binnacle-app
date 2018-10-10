import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthorizationInterceptor } from './authorization.interceptor';
import { AuthorizationService } from '../services/authorization/authorization.service';

describe('AuthorizationInterceptor', () => {
  let authorizationServiceStub = {
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
          provide: AuthorizationService,
          useValue: authorizationServiceStub
        }
      ]
    }));

  it('should add token from #authorizationService to all requests', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      http.get('test').subscribe(response => expect(response).toBeTruthy());
      const request = mock.expectOne(
        req =>
          req.headers.has('Authorization') &&
          req.headers.get('Authorization') == 'Basic token'
      );

      request.flush({ data: 'test' });
      mock.verify();
    }
  ));

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
