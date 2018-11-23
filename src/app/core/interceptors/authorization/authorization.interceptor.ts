import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  constructor(public authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (
      this.authenticationService.getAuthentication() &&
      !request.headers.has('Authorization')
    ) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${
            this.authenticationService.getAuthentication().access_token
          }`
        }
      });
    }
    return next.handle(request);
  }
}
