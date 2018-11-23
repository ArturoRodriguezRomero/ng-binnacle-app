import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { APIInterceptor } from './api.interceptor';

describe('APIInterceptor', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: APIInterceptor,
          multi: true
        }
      ]
    })
  );

  it('should add base #apiUrl from enviroment to all requests', inject(
    [HttpClient, HttpTestingController],
    (http: HttpClient, mock: HttpTestingController) => {
      http.get('test').subscribe(response => expect(response).toBeTruthy());
      const request = mock.expectOne(
        req => req.url.includes(environment.apiUrl) && req.url.includes('/test')
      );

      request.flush({ data: 'test' });
      mock.verify();
    }
  ));

  afterEach(inject([HttpTestingController], (mock: HttpTestingController) => {
    mock.verify();
  }));
});
