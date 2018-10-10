import { async, ComponentFixture, TestBed, tick } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import {
  NgxsModule,
  Actions,
  Store,
  ofActionSuccessful,
  ofActionDispatched
} from '@ngxs/store';
import { LoginState } from 'src/app/shared/store/login/login.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NotifierService } from 'angular-notifier';
import {
  LoginError,
  LoginRequest
} from 'src/app/shared/store/login/login.actions';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: Store;
  let actions$: Actions;

  let notifierServiceStub = { notify: () => {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent, LoadingSpinnerComponent],
      imports: [
        ReactiveFormsModule,
        NgxsModule.forRoot([LoginState]),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        {
          provide: NotifierService,
          useValue: notifierServiceStub
        }
      ]
    }).compileComponents();
    actions$ = TestBed.get(Actions);
    store = TestBed.get(Store);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add #card--failed-login to #card on @Action LoginError on #ngOnInit', () => {
    component.ngOnInit();

    store.dispatch(new LoginError(null));

    actions$.pipe(ofActionSuccessful(LoginError)).subscribe(() => {
      expect(component.card.nativeElement.classList).toContain(
        'card--failed-login'
      );
    });
  });

  it('should dispatch @Action LoginRequest with credentials on #handleSubmit', () => {
    component.credentials.controls.username.setValue('username');
    component.credentials.controls.password.setValue('password');

    actions$.pipe(ofActionDispatched(LoginRequest)).subscribe(action => {
      expect(action.payload.username).toEqual('username');
      expect(action.payload.password).toEqual('password');
    });

    component.handleSubmit();
  });
});
