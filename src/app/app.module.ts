import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthorizationInterceptor } from './core/interceptors/authorization.interceptor';

import { LoginModule } from './modules/login/login.module';
import { ActivitiesModule } from './modules/activities/activities.module';

import { NotifierModule } from 'angular-notifier';
import { AuthorizationGuardService } from './core/services/authorization/authorization.guard.service';
import { NgxsModule } from '@ngxs/store';
import { LoginState } from './shared/store/login/login.state';
import { UserState } from './shared/store/user/user.state';
import { APIInterceptor } from './core/interceptors/api.interceptor';
import { ActivitiesState } from './shared/store/activities/activities.state';
import { ComponentsModule } from './shared/components/components.module';
import { notifierOptions } from './shared/misc/notifier-config';

import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { CalendarState } from './shared/store/calendar/calendar.state';
import { HolidaysState } from './shared/store/holidays/holidays.state';
import { ActivityDetailState } from './shared/store/activity-detail/activity-detail.state';
import { ActivityFormState } from './shared/store/activity-form/activity-form.state';
import { NavigationDrawerState } from './shared/store/navigation-drawer/navigation-drawer.state';
import { PageScrollState } from './shared/store/page-scroll/page-scroll.state';
registerLocaleData(localeEs, 'es');

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgxsModule.forRoot([
      LoginState,
      UserState,
      ActivitiesState,
      CalendarState,
      HolidaysState,
      ActivityDetailState,
      ActivityFormState,
      NavigationDrawerState,
      PageScrollState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    HttpClientModule,
    LoginModule,
    ActivitiesModule,
    NotifierModule.withConfig(notifierOptions),
    ComponentsModule
  ],
  providers: [
    HttpClientModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true
    },
    ,
    /*{
      provide: RouteReuseStrategy,
      useClass: CustomReuseStrategy
    },*/
    AuthorizationGuardService,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
