import { TestBed } from '@angular/core/testing';
import {
  NgxsModule,
  Store,
  Actions,
  ofActionSuccessful,
  ofActionDispatched,
  ofActionErrored
} from '@ngxs/store';
import { LoginState } from './login.state';
import { ErrorHandlerService } from '../../../core/handlers/error/error-handler.service';
import { errorHandlerServiceStub } from '../../../core/handlers/__mocks__/error.handler.service.stub';
import { LoginRequest, LoginError, LoginSuccess } from './login.actions';
import { AuthenticationService } from '../../../core/services/authentication/authentication.service';
import { authenticationServiceStub } from '../../../core/services/__mocks__/authentication.service.stub';
import { AppRoutingModule } from '../../../app-routing.module';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from '../../../modules/login/pages/login/login.component';
import { ActivitiesComponent } from '../../../modules/activities/pages/activities/activities.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { MonthProgressBarComponent } from '../../../modules/activities/components/month-progress-bar/month-progress-bar.component';
import { DayMobileComponent } from '../../../modules/activities/components/day-mobile/day-mobile.component';
import { ActivityCardMobileComponent } from '../../../modules/activities/components/activity-card-mobile/activity-card-mobile.component';
import { AuthenticationGuardService } from '../../../core/services/authentication/authentication.guard.service';
import { Credentials } from '../../models/Credentials';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IsSundayPipe } from '../../pipes/is.sunday.pipe/is.sunday.pipe';
import { WeekSeparatorComponent } from 'src/app/modules/activities/components/week-separator/week-separator.component';
import { HoursAndMinutesPipe } from '../../pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { CalculateEndDatePipe } from '../../pipes/calculate.end.date.pipe/calculate.end.date.pipe';
import { CalendarMenuComponent } from 'src/app/modules/activities/components/calendar-menu/calendar-menu.component';
import { ActivityPreviewComponent } from 'src/app/modules/activities/components/activity-preview/activity-preview.component';
import { LongPressDirective } from '../../directives/long.press.directive/long.press.directive';
import { TruncatePipe } from '../../pipes/truncate.pipe/truncate.pipe';
import { ActivityFormComponent } from 'src/app/modules/activities/pages/activity-form/activity-form.component';
import { IsMondayPipe } from '../../pipes/is.monday.pipe/is.monday.pipe';
import { NgSelectModule } from '@ng-select/ng-select';
import { TimeFormComponent } from 'src/app/modules/activities/components/time-form/time-form.component';
import { ProjectFormComponent } from 'src/app/modules/activities/components/project-form/project-form.component';
import { ActivitiesContainerComponent } from 'src/app/modules/activities/pages/activities-container/activities-container.component';
import { NavigationDrawerComponent } from '../../components/navigation-drawer/navigation-drawer.component';

describe('Login State', () => {
  let store: Store;
  let authenticationService: AuthenticationService;
  let errorHandlerService: ErrorHandlerService;

  let actions$: Observable<any>;

  let router: Router;

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
        LongPressDirective,
        TruncatePipe,
        ActivityFormComponent,
        IsMondayPipe,
        TimeFormComponent,
        ProjectFormComponent,
        ActivitiesContainerComponent,
        NavigationDrawerComponent
      ],
      imports: [
        CommonModule,
        AppRoutingModule,
        NgxsModule.forRoot([LoginState]),
        ReactiveFormsModule,
        FormsModule,
        NgSelectModule
      ],
      providers: [
        AppRoutingModule,
        {
          provide: AuthenticationService,
          useValue: authenticationServiceStub
        },
        AuthenticationGuardService,
        {
          provide: ErrorHandlerService,
          useValue: errorHandlerServiceStub
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    });
    store = TestBed.get(Store);
    authenticationService = TestBed.get(AuthenticationService);
    actions$ = TestBed.get(Actions);
    router = TestBed.get(Router);
    errorHandlerService = TestBed.get(ErrorHandlerService);
  });

  // TODO
  /*it('should set loading = true when @Action(LoginRequest)', () => {
    store.dispatch(new LoginRequest({ username: 'test', password: 'test' }));

    store.selectOnce(state => state.login.loading).subscribe(loading => {
      expect(loading).toEqual(true);
    });
  });*/

  it('should get #credentials from #payload when @Action(LoginRequest)', () => {
    const credentials: Credentials = { username: 'test', password: 'test' };
    spyOn(authenticationService, 'tryAuthenticate').and.callThrough();

    store.dispatch(new LoginRequest(credentials));

    expect(authenticationService.tryAuthenticate).toHaveBeenCalledWith(
      credentials
    );
  });

  it('should call #authenticationService.checkUser when @Action(LoginRequest)', () => {
    spyOn(authenticationService, 'tryAuthenticate').and.callThrough();

    store.dispatch(new LoginRequest({ username: 'test', password: 'test' }));

    expect(authenticationService.tryAuthenticate).toHaveBeenCalled();
  });

  it('should dispatch @Action LoginSuccess if #tryAuthenticate is successfull', () => {
    spyOn(authenticationService, 'tryAuthenticate').and.callThrough();
    store.dispatch(new LoginRequest({ username: 'test', password: 'test' }));

    actions$
      .pipe(ofActionSuccessful(LoginRequest))
      .subscribe(loginRequestActions => {
        actions$.pipe(ofActionDispatched(LoginSuccess)).subscribe(actions => {
          expect(actions).toEqual(true);
        });
      });
  });

  it('should dispatch @Action LoginError if #tryAuthenticate fails', () => {
    spyOn(authenticationService, 'tryAuthenticate').and.throwError('error');
    store.dispatch(new LoginRequest({ username: 'test', password: 'test' }));

    actions$
      .pipe(ofActionErrored(LoginRequest))
      .subscribe(loginRequestActions => {
        actions$.pipe(ofActionDispatched(LoginError)).subscribe(actions => {
          expect(actions).toEqual(true);
        });
      });
  });

  it('should set state loading = false when @Action Login Success', () => {
    store.dispatch(new LoginSuccess());

    store
      .selectOnce(state => state.login.loading)
      .subscribe(loading => {
        expect(loading).toEqual(false);
      });
  });

  it('should #router navigate to /activities when @Action Login Success', () => {
    spyOn(router, 'navigate').and.callThrough();

    store.dispatch(new LoginSuccess());

    expect(router.navigate).toHaveBeenCalledWith(['/activities']);
  });

  it('should set state loading = false when @Action Login Error', () => {
    store.dispatch(new LoginError(null));

    store
      .selectOnce(state => state.login.loading)
      .subscribe(loading => {
        expect(loading).toEqual(false);
      });
  });

  it('should #errorHandlerService.throw when @Action Login Error', () => {
    spyOn(errorHandlerService, 'throw').and.callThrough();

    store.dispatch(new LoginError(null));

    expect(errorHandlerService.throw).toHaveBeenCalled();
  });
});
