import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(public auth: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      url: `${environment.apiUrl}/${request.urlWithParams}`
    });
    return next.handle(request);
  }
}
