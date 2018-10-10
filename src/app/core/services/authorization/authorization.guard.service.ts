import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {
  UserState,
  UserStateModel
} from '../../../shared/store/user/user.state';
import { AuthorizationService } from './authorization.service';

@Injectable()
export class AuthorizationGuardService implements CanActivate {
  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  canActivate() {
    if (this.authorizationService.getToken()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
