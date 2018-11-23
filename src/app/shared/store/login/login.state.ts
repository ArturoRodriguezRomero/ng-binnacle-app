import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { LoginRequest, LoginSuccess, LoginError } from './login.actions';
import { Router } from '@angular/router';
import { Credentials } from '../../models/Credentials';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { SetUser } from '../user/user.actions';
import { ErrorHandlerService } from '../../../core/handlers/error/error-handler.service';
import { NgZone } from '@angular/core';
import { AuthenticationResponse } from '../../models/AuthenticationResponse';

export interface LoginStateModel {
  loading: boolean;
}

@State<LoginStateModel>({
  name: 'login',
  defaults: {
    loading: false
  }
})
export class LoginState {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store,
    private errorHandlerService: ErrorHandlerService,
    private zone: NgZone
  ) {}

  @Action(LoginRequest)
  LoginRequest(
    { patchState }: StateContext<LoginStateModel>,
    { payload }: LoginRequest
  ) {
    patchState({ loading: true });
    const credentials: Credentials = {
      username: payload.username,
      password: payload.password
    };
    this.authenticationService.tryAuthenticate(credentials).subscribe(
      (authentication: AuthenticationResponse) => {
        this.authenticationService.setAuthentication(authentication);
        this.store.dispatch(new SetUser(authentication.user));
        this.store.dispatch(new LoginSuccess());
      },
      error => {
        this.store.dispatch(new LoginError(error));
      }
    );
  }

  @Action(LoginSuccess)
  LoginSuccess(stateContext: StateContext<LoginStateModel>) {
    stateContext.patchState({ loading: false });
    this.zone.run(() => {
      this.router.navigate(['/activities']);
    });
  }

  @Action(LoginError)
  LoginError(stateContext: StateContext<LoginStateModel>, action: LoginError) {
    stateContext.patchState({ loading: false });
    this.errorHandlerService.throw(action.error);
  }
}
