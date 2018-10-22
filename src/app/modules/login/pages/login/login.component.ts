import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  Store,
  Select,
  Actions,
  ofActionSuccessful,
  ofActionDispatched
} from '@ngxs/store';
import {
  LoginRequest,
  LoginError
} from '../../../../shared/store/login/login.actions';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { LoginStateModel } from '../../../../shared/store/login/login.state';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Select(state => state.login)
  loginState$: Observable<LoginStateModel>;

  @ViewChild('card')
  card: ElementRef;

  public credentials = new FormGroup({
    username: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.minLength(1)
    ]),
    password: new FormControl({ value: '', disabled: false }, [
      Validators.required,
      Validators.minLength(1)
    ])
  });

  constructor(private store: Store, private actions$: Actions) {}

  ngOnInit() {
    this.actions$.pipe(ofActionDispatched(LoginRequest)).subscribe(() => {
      this.card.nativeElement.classList.remove('card--failed-login');
    });
    this.actions$.pipe(ofActionSuccessful(LoginError)).subscribe(() => {
      this.card.nativeElement.classList.add('card--failed-login');
    });
  }

  handleSubmit() {
    this.store.dispatch(
      new LoginRequest({
        username: this.credentials.get('username').value,
        password: this.credentials.get('password').value
      })
    );
  }
}
