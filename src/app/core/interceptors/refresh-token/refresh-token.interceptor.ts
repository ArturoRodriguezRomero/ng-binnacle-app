import {
  throwError as observableThrowError,
  Observable,
  BehaviorSubject
} from 'rxjs';

import { take, filter, catchError, switchMap, finalize } from 'rxjs/operators';
import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthenticationResponse } from 'src/app/shared/models/AuthenticationResponse';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private authenticationService: AuthenticationService) {}

  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({ setHeaders: { Authorization: 'Bearer ' + token } });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<
    | HttpSentEvent
    | HttpHeaderResponse
    | HttpProgressEvent
    | HttpResponse<any>
    | HttpUserEvent<any>
  > {
    if (this.authenticationService.getAuthentication() == null) {
      return next.handle(req);
    }
    return next.handle(req).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          switch ((<HttpErrorResponse>error).status) {
            case 400:
              return this.handle400Error(error);
            case 401:
              return this.handle401Error(req, next);
            default:
              return observableThrowError(error);
          }
        } else {
          return observableThrowError(error);
        }
      })
    );
  }

  handle400Error(error) {
    if (
      error &&
      error.status === 400 &&
      error.error &&
      error.error.error === 'invalid_grant'
    ) {
      return this.logoutUser();
    }
    return observableThrowError(error);
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;

      this.tokenSubject.next(null);

      const authService = this.authenticationService;

      return authService.tryRefreshAuthentication().pipe(
        switchMap((authentication: AuthenticationResponse) => {
          console.log('new token', authentication);
          if (authentication) {
            this.authenticationService.setAuthentication(authentication);
            this.tokenSubject.next(authentication.access_token);
            return next.handle(this.addToken(req, authentication.access_token));
          }
          return this.logoutUser();
        }),
        catchError(error => {
          return this.logoutUser();
        }),
        finalize(() => {
          this.isRefreshingToken = false;
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(token => {
          return next.handle(this.addToken(req, token));
        })
      );
    }
  }

  logoutUser() {
    return observableThrowError('');
  }
}
