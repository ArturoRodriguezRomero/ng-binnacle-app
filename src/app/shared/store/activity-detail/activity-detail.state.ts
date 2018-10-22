import { Activity } from '../../models/Activity';
import { State, Store, Action, StateContext } from '@ngxs/store';
import {
  SetActivityDetail,
  UnsetActivityDetail
} from './activity-detail.actions';

export interface ActivityDetailStateModel {
  activity: Activity;
}

@State<ActivityDetailStateModel>({
  name: 'activityDetail',
  defaults: {
    activity: null
  }
})
export class ActivityDetailState {
  constructor(private store: Store) {}

  @Action(SetActivityDetail)
  SetActivityDetail(
    stateContext: StateContext<ActivityDetailStateModel>,
    action: SetActivityDetail
  ) {
    stateContext.patchState({ activity: action.activity });
  }

  @Action(UnsetActivityDetail)
  UnsetActivityDetail(
    stateContext: StateContext<ActivityDetailStateModel>,
    action: SetActivityDetail
  ) {
    stateContext.patchState({ activity: null });
  }
}
