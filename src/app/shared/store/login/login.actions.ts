import { Credentials } from '../../models/Credentials';
import { HttpErrorResponse } from '@angular/common/http';

export class LoginRequest {
  static readonly type = '[login store] Login Request';
  constructor(public payload: Credentials) {}
}

export class LoginSuccess {
  static readonly type = '[login store] Login Success';
}

export class LoginError {
  static readonly type = '[login store] Login Error';
  constructor(public error: HttpErrorResponse) {}
}
