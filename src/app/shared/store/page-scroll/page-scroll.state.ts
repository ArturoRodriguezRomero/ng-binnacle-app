import { State, Store, Action, StateContext } from '@ngxs/store';
import { LockScroll, UnlockScroll } from './page-scroll.actions';

export interface PageScrollStateModel {
  isPageScrollLocked: boolean;
}

@State<PageScrollStateModel>({
  name: 'pageScroll',
  defaults: {
    isPageScrollLocked: false
  }
})
export class PageScrollState {
  constructor(private store: Store) {}

  @Action(LockScroll)
  LockScroll(
    stateContext: StateContext<PageScrollStateModel>,
    action: LockScroll
  ) {
    stateContext.patchState({ isPageScrollLocked: true });
    this.togglePageScroll(stateContext.getState().isPageScrollLocked);
  }

  @Action(UnlockScroll)
  UnlockScroll(
    stateContext: StateContext<PageScrollStateModel>,
    action: UnlockScroll
  ) {
    stateContext.patchState({ isPageScrollLocked: false });
    this.togglePageScroll(stateContext.getState().isPageScrollLocked);
  }

  togglePageScroll(isLocked: boolean) {
    document.querySelector('body').classList.toggle('lock-scroll', isLocked);
  }
}
