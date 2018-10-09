import { State, Store, Action, StateContext } from '@ngxs/store';
import { ErrorHandlerService } from '../../../core/handlers/error/error-handler.service';
import {
  SetSelectedDate,
  GetImputedDaysByDatesRequest,
  GetImputedDaysByDatesSuccess,
  GetImputedDaysByDatesError
} from './calendar.actions';
import { ActivitiesService } from '../../../core/services/activities/activities.service';

export interface CalendarStateModel {
  loading: boolean;
  selectedDate: Date;
  imputedDays: string[];
}

@State<CalendarStateModel>({
  name: 'calendar',
  defaults: {
    loading: false,
    selectedDate: new Date(),
    imputedDays: []
  }
})
export class CalendarState {
  constructor(
    private store: Store,
    private activitiesService: ActivitiesService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  @Action(SetSelectedDate)
  SetSelectedDate(
    stateContext: StateContext<CalendarStateModel>,
    action: SetSelectedDate
  ) {
    stateContext.patchState({ selectedDate: action.date });
  }

  @Action(GetImputedDaysByDatesRequest)
  GetImputedDaysByDatesRequest(
    stateContext: StateContext<CalendarStateModel>,
    action: GetImputedDaysByDatesRequest
  ) {
    stateContext.patchState({ loading: true });
    console.log(action);
    this.activitiesService
      .getImputedDaysByDates(action.startDate, action.endDate)
      .subscribe(
        data => {
          this.store.dispatch(new GetImputedDaysByDatesSuccess(data));
        },
        error => {
          this.store.dispatch(new GetImputedDaysByDatesError(error));
        }
      );
  }

  @Action(GetImputedDaysByDatesSuccess)
  GetImputedDaysByDatesSuccess(
    stateContext: StateContext<CalendarStateModel>,
    action: GetImputedDaysByDatesSuccess
  ) {
    stateContext.patchState({ loading: false });
    stateContext.patchState({ imputedDays: action.days });
  }

  @Action(GetImputedDaysByDatesError)
  GetImputedDaysByDatesError(
    stateContext: StateContext<CalendarStateModel>,
    action: GetImputedDaysByDatesError
  ) {
    stateContext.patchState({ loading: false });
    this.errorHandlerService.throw(action.error);
  }
}
