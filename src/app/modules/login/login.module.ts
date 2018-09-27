import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentsModule } from '../../shared/components/components.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ComponentsModule],
  declarations: [LoginComponent],
  exports: [LoginComponent]
})
export class LoginModule {
  constructor() {}
}
