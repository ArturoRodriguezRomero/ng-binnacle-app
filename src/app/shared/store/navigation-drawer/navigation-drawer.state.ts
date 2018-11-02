import {
  ShowNavigationDrawer,
  HideNaviationDrawer
} from './navigation-drawer.actions';
import { State, Store, Action, StateContext } from '@ngxs/store';

export interface NavigationDrawerStateModel {
  isNavigationDrawerVisible: boolean;
}

@State<NavigationDrawerStateModel>({
  name: 'navigationDrawer',
  defaults: {
    isNavigationDrawerVisible: false
  }
})
export class NavigationDrawerState {
  constructor(private store: Store) {}

  @Action(ShowNavigationDrawer)
  ShowNavigationDrawer(
    stateContext: StateContext<NavigationDrawerStateModel>,
    action: ShowNavigationDrawer
  ) {
    stateContext.patchState({ isNavigationDrawerVisible: true });
  }

  @Action(HideNaviationDrawer)
  HideNavigationDrawer(
    stateContext: StateContext<NavigationDrawerStateModel>,
    action: HideNaviationDrawer
  ) {
    stateContext.patchState({ isNavigationDrawerVisible: false });
  }
}
