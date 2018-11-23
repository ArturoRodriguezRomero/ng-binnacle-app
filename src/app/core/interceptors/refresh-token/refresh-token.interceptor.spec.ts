import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';

describe('Refresh Token Interceptor', () => {
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
          useClass: RefreshTokenInterceptor,
          multi: true
        },
        {
          provide: AuthenticationService,
          useValue: authenticationServiceStub
        }
      ]
    })
  );

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
