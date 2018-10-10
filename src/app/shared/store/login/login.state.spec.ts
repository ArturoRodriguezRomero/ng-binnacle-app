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
import { AuthorizationService } from '../../../core/services/authorization/authorization.service';
import { authorizationServiceStub } from '../../../core/services/__mocks__/authorization.service.stub';
import { AppRoutingModule } from '../../../app-routing.module';
import { CommonModule, APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from '../../../modules/login/pages/login/login.component';
import { ActivitiesComponent } from '../../../modules/activities/pages/activities/activities.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../components/loading-spinner/loading-spinner.component';
import { MonthProgressBarComponent } from '../../../modules/activities/components/month-progress-bar/month-progress-bar.component';
import { DayMobileComponent } from '../../../modules/activities/components/day-mobile/day-mobile.component';
import { ActivityCardMobileComponent } from '../../../modules/activities/components/activity-card-mobile/activity-card-mobile.component';
import { AuthorizationGuardService } from '../../../core/services/authorization/authorization.guard.service';
import { Credentials } from '../../models/Credentials';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { IsSundayPipe } from '../../pipes/is.sunday.pipe';
import { WeekSeparatorComponent } from 'src/app/modules/activities/components/week-separator/week-separator.component';
import { HoursAndMinutesPipe } from '../../pipes/hours.and.minutes.pipe';
import { CalculateEndDatePipe } from '../../pipes/calculate.end.date.pipe';

describe('Login State', () => {
  let store: Store;
  let authorizationService: AuthorizationService;
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
        CalculateEndDatePipe
      ],
      imports: [
        CommonModule,
        AppRoutingModule,
        NgxsModule.forRoot([LoginState]),
        ReactiveFormsModule
      ],
      providers: [
        AppRoutingModule,
        {
          provide: AuthorizationService,
          useValue: authorizationServiceStub
        },
        AuthorizationGuardService,
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
    authorizationService = TestBed.get(AuthorizationService);
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
    spyOn(authorizationService, 'checkUser').and.callThrough();

    store.dispatch(new LoginRequest(credentials));

    expect(authorizationService.checkUser).toHaveBeenCalledWith(credentials);
  });

  it('should call #authorizationService.checkUser when @Action(LoginRequest)', () => {
    spyOn(authorizationService, 'checkUser').and.callThrough();

    store.dispatch(new LoginRequest({ username: 'test', password: 'test' }));

    expect(authorizationService.checkUser).toHaveBeenCalled();
  });

  it('should dispatch @Action LoginSuccess if #checkUser is successfull', () => {
    spyOn(authorizationService, 'checkUser').and.callThrough();
    store.dispatch(new LoginRequest({ username: 'test', password: 'test' }));

    actions$.pipe(ofActionSuccessful(LoginRequest)).subscribe(actions => {
      actions$.pipe(ofActionDispatched(LoginSuccess)).subscribe(actions => {
        expect(actions).toEqual(true);
      });
    });
  });

  it('should dispatch @Action LoginError if #checkUser fails', () => {
    spyOn(authorizationService, 'checkUser').and.throwError('error');
    store.dispatch(new LoginRequest({ username: 'test', password: 'test' }));

    actions$.pipe(ofActionErrored(LoginRequest)).subscribe(actions => {
      actions$.pipe(ofActionDispatched(LoginError)).subscribe(actions => {
        expect(actions).toEqual(true);
      });
    });
  });

  it('should set state loading = false when @Action Login Success', () => {
    store.dispatch(new LoginSuccess());

    store.selectOnce(state => state.login.loading).subscribe(loading => {
      expect(loading).toEqual(false);
    });
  });

  it('should #router navigate to /home when @Action Login Success', () => {
    spyOn(router, 'navigate').and.callThrough();

    store.dispatch(new LoginSuccess());

    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });

  it('should set state loading = false when @Action Login Error', () => {
    store.dispatch(new LoginError(null));

    store.selectOnce(state => state.login.loading).subscribe(loading => {
      expect(loading).toEqual(false);
    });
  });

  it('should #errorHandlerService.throw when @Action Login Error', () => {
    spyOn(errorHandlerService, 'throw').and.callThrough();

    store.dispatch(new LoginError(null));

    expect(errorHandlerService.throw).toHaveBeenCalled();
  });
});
