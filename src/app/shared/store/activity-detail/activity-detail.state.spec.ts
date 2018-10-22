import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store, Actions, ofActionDispatched } from '@ngxs/store';
import { AppRoutingModule } from '../../../app-routing.module';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from '../../../modules/login/pages/login/login.component';
import { ActivitiesComponent } from '../../../modules/activities/pages/activities/activities.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { MonthProgressBarComponent } from '../../../modules/activities/components/month-progress-bar/month-progress-bar.component';
import { DayMobileComponent } from '../../../modules/activities/components/day-mobile/day-mobile.component';
import { ActivityCardMobileComponent } from '../../../modules/activities/components/activity-card-mobile/activity-card-mobile.component';
import { Observable } from 'rxjs';
import { IsSundayPipe } from '../../pipes/is.sunday.pipe/is.sunday.pipe';
import { WeekSeparatorComponent } from 'src/app/modules/activities/components/week-separator/week-separator.component';
import { HoursAndMinutesPipe } from '../../pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { CalculateEndDatePipe } from '../../pipes/calculate.end.date.pipe/calculate.end.date.pipe';
import { CalendarMenuComponent } from 'src/app/modules/activities/components/calendar-menu/calendar-menu.component';
import { ActivityPreviewComponent } from 'src/app/modules/activities/components/activity-preview/activity-preview.component';
import { TruncatePipe } from '../../pipes/truncate.pipe/truncate.pipe';
import { LongPressDirective } from '../../directives/long.press.directive/long.press.directive';
import {
  ActivityDetailState,
  ActivityDetailStateModel
} from './activity-detail.state';
import {
  SetActivityDetail,
  UnsetActivityDetail
} from './activity-detail.actions';
import { ModelsMock } from '../../__mocks__/models.mock';

describe('Holidays State', () => {
  let store: Store;

  let actions$: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        ActivitiesComponent,
        LoadingSpinnerComponent,
        MonthProgressBarComponent,
        DayMobileComponent,
        ActivityCardMobileComponent,
        IsSundayPipe,
        WeekSeparatorComponent,
        HoursAndMinutesPipe,
        CalculateEndDatePipe,
        CalendarMenuComponent,
        ActivityPreviewComponent,
        TruncatePipe,
        LongPressDirective
      ],
      imports: [
        CommonModule,
        AppRoutingModule,
        NgxsModule.forRoot([ActivityDetailState]),
        ReactiveFormsModule
      ],
      providers: [
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    });
    store = TestBed.get(Store);
    actions$ = TestBed.get(Actions);
  });

  it('should set #activity when @Action(SetActivityDetail)', () => {
    actions$
      .pipe(ofActionDispatched(SetActivityDetail))
      .subscribe((action: SetActivityDetail) => {
        expect(action.activity).toEqual(
          ModelsMock.Activity,
          'expected activity'
        );
      });
    store.dispatch(new SetActivityDetail(ModelsMock.Activity));
  });

  it('should set #activity when @Action(UnsetActivityDetail)', () => {
    actions$
      .pipe(ofActionDispatched(UnsetActivityDetail))
      .subscribe(actions => {
        store
          .selectOnce(state => state.ActivityDetail)
          .subscribe((state: ActivityDetailStateModel) => {
            expect(state.activity).toEqual(null);
          });
      });
    store.dispatch(new UnsetActivityDetail());
  });
});
