import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuardService implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    if (this.authenticationService.getAuthentication()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
