import { State, StateContext, Action, Store } from '@ngxs/store';
import {
  GetActivitiesByDatesRequest,
  GetActivitiesByDatesSuccess,
  GetActivitiesByDatesError
} from './activities.actions';
import { ActivitiesService } from '../../../core/services/activities/activities.service';
import { ErrorHandlerService } from '../../../core/handlers/error/error-handler.service';
import { Activity } from '../../models/Activity';
import { ActivityDay } from '../../models/ActivityDay';

export interface ActivitiesStateModel {
  loading: boolean;
  days: Array<ActivityDay>;
  activities: Array<Activity>;
}

@State<ActivitiesStateModel>({
  name: 'activities',
  defaults: {
    loading: false,
    days: [],
    activities: []
  }
})
export class ActivitiesState {
  constructor(
    private store: Store,
    private activitiesService: ActivitiesService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  @Action(GetActivitiesByDatesRequest)
  GetActivitiesByDatesRequest(
    stateContext: StateContext<ActivitiesStateModel>,
    action: GetActivitiesByDatesRequest
  ) {
    stateContext.patchState({ loading: true });
    this.activitiesService
      .getActivitiesByDates(action.startDate, action.endDate)
      .subscribe(
        data => {
          this.store.dispatch(new GetActivitiesByDatesSuccess(data));
        },
        error => {
          this.store.dispatch(new GetActivitiesByDatesError(error));
        }
      );
  }

  @Action(GetActivitiesByDatesSuccess)
  GetActivitiesByDatesSuccess(
    stateContext: StateContext<ActivitiesStateModel>,
    action: GetActivitiesByDatesSuccess
  ) {
    stateContext.patchState({ loading: false });
    const activities = this.getActivities(action.days);
    stateContext.patchState({ days: action.days, activities: activities });
  }

  @Action(GetActivitiesByDatesError)
  GetActivitiesByDatesError(
    stateContext: StateContext<ActivitiesStateModel>,
    action: GetActivitiesByDatesError
  ) {
    stateContext.patchState({ loading: false });
    this.errorHandlerService.throw(action.error);
  }

  getActivities(days: Array<any>) {
    return days.reduce((allActivities, activity) => {
      return [...allActivities, ...activity.activities];
    }, []);
  }
}
