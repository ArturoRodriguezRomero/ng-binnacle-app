import { State, Action, StateContext, Selector, Store } from '@ngxs/store';
import { User } from '../../models/User';
import { SetUser, UnsetUser } from './user.actions';

export interface UserStateModel {
  user: User;
  monthlyHours: number;
  workingDays: number;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    user: undefined,
    monthlyHours: 160,
    workingDays: 20
  }
})
export class UserState {
  constructor(store: Store) {}

  @Action(SetUser)
  SetUser({ patchState }: StateContext<UserStateModel>, { payload }: SetUser) {
    patchState({ user: payload });
  }

  @Action(UnsetUser)
  UnsetUser({ patchState }: StateContext<UserStateModel>) {
    patchState({ user: undefined });
  }
}
