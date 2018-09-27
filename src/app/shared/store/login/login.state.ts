import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { LoginRequest, LoginSuccess, LoginError } from './login.actions';
import { Router } from '@angular/router';
import { Credentials } from '../../models/Credentials';
import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { SetUser } from '../user/user.actions';
import { ErrorHandlerService } from '../../../core/handlers/error/error-handler.service';

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
    private authorizationService: AuthorizationService,
    private router: Router,
    private store: Store,
    private errorHandlerService: ErrorHandlerService
  ) {}

  @Action(LoginRequest)
  async LoginRequest(
    { patchState }: StateContext<LoginStateModel>,
    { payload }: LoginRequest
  ) {
    patchState({ loading: true });
    const credentials: Credentials = {
      username: payload.username,
      password: payload.password
    };
    this.authorizationService.checkUser(credentials).subscribe(
      user => {
        this.store.dispatch(new SetUser(user));
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
    this.router.navigate(['/home']);
  }

  @Action(LoginError)
  LoginError(stateContext: StateContext<LoginStateModel>, action: LoginError) {
    stateContext.patchState({ loading: false });
    this.errorHandlerService.throw(action.error);
  }
}
