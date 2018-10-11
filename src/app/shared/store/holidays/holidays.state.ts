import { State, Store, StateContext, Action } from '@ngxs/store';
import { ErrorHandlerService } from 'src/app/core/handlers/error/error-handler.service';

import {
  GetHolidaysRequest,
  GetHolidaysSuccess,
  GetHolidaysError
} from './holidays.actions';
import { HolidaysService } from 'src/app/core/services/holidays/holidays.service';
import { PublicHoliday } from '../../models/PublicHoliday';
import { PrivateHoliday } from '../../models/PrivateHoliday';

export interface HolidaysStateModel {
  loading: boolean;
  publicHolidays: PublicHoliday[];
  privateHolidays: PrivateHoliday[];
}

@State<HolidaysStateModel>({
  name: 'holidays',
  defaults: {
    loading: false,
    publicHolidays: [],
    privateHolidays: []
  }
})
export class HolidaysState {
  constructor(
    private store: Store,
    private holidaysService: HolidaysService,
    private errorHandlerService: ErrorHandlerService
  ) {}

  @Action(GetHolidaysRequest)
  GetHolidaysRequest(
    stateContext: StateContext<HolidaysStateModel>,
    action: GetHolidaysRequest
  ) {
    stateContext.patchState({ loading: true });
    // TODO: turn into chainable requests.
    this.holidaysService.getPrivateHolidaysThisYear().subscribe(
      privateHolidays => {
        this.holidaysService
          .getPublicHolidaysByYear(new Date().getFullYear())
          .subscribe(
            publicHolidays => {
              this.store.dispatch(
                new GetHolidaysSuccess(publicHolidays, privateHolidays)
              );
            },
            error => {
              this.store.dispatch(new GetHolidaysError(error));
            }
          );
      },
      error => {
        this.store.dispatch(new GetHolidaysError(error));
      }
    );
  }

  @Action(GetHolidaysSuccess)
  GetHolidaysSuccess(
    stateContext: StateContext<HolidaysStateModel>,
    action: GetHolidaysSuccess
  ) {
    stateContext.patchState({ loading: false });
    stateContext.patchState({
      publicHolidays: action.publicHolidays,
      privateHolidays: action.privateHolidays
    });
  }

  @Action(GetHolidaysError)
  GetHolidaysError(
    stateContext: StateContext<HolidaysStateModel>,
    action: GetHolidaysError
  ) {
    stateContext.patchState({ loading: false });
    this.errorHandlerService.throw(action.error);
  }
}
