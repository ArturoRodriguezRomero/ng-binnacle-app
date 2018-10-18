import { TestBed } from '@angular/core/testing';

import { AuthorizationService } from './authorization.service';
import { HttpClient } from '@angular/common/http';
import { AuthorizationGuardService } from './authorization.guard.service';
import { AppRoutingModule } from '../../../app-routing.module';
import { LoginComponent } from '../../../modules/login/pages/login/login.component';
import { ActivitiesComponent } from '../../../modules/activities/pages/activities/activities.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';
import { MonthProgressBarComponent } from '../../../modules/activities/components/month-progress-bar/month-progress-bar.component';
import { DayMobileComponent } from '../../../modules/activities/components/day-mobile/day-mobile.component';
import { IsSundayPipe } from '../../../shared/pipes/is.sunday.pipe';
import { WeekSeparatorComponent } from '../../../modules/activities/components/week-separator/week-separator.component';
import { HoursAndMinutesPipe } from '../../../shared/pipes/hours.and.minutes.pipe';
import { ActivityCardMobileComponent } from '../../../modules/activities/components/activity-card-mobile/activity-card-mobile.component';
import { CalculateEndDatePipe } from '../../../shared/pipes/calculate.end.date.pipe';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import { CalendarMenuComponent } from 'src/app/modules/activities/components/calendar-menu/calendar-menu.component';

describe('AuthorizationService', () => {
  let authorizationGuardService: AuthorizationGuardService;
  let authorizationServiceSpy: { getToken: jasmine.Spy };
  let router: Router;

  beforeEach(() => {
    authorizationServiceSpy = jasmine.createSpyObj('AuthorizationService', [
      'getToken'
    ]);
    TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        ActivitiesComponent,
        LoadingSpinnerComponent,
        MonthProgressBarComponent,
        DayMobileComponent,
        IsSundayPipe,
        WeekSeparatorComponent,
        HoursAndMinutesPipe,
        ActivityCardMobileComponent,
        CalculateEndDatePipe,
        CalendarMenuComponent
      ],
      imports: [AppRoutingModule, ReactiveFormsModule],
      providers: [
        AuthorizationGuardService,
        {
          provide: AuthorizationService,
          useValue: authorizationServiceSpy
        },
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    });
    authorizationGuardService = TestBed.get(AuthorizationGuardService);
    router = TestBed.get(Router);
  });

  it('should be created', () => {
    expect(authorizationGuardService).toBeTruthy();
  });

  it('should return true when #canActivate and #authorizationService.getToken() is true', () => {
    authorizationServiceSpy.getToken.and.returnValue('test');

    expect(authorizationGuardService.canActivate()).toEqual(
      true,
      'Returns true'
    );
  });

  it('should return false when #canActivate and #authorizationService.getToken() is false', () => {
    authorizationServiceSpy.getToken.and.returnValue(undefined);

    expect(authorizationGuardService.canActivate()).toEqual(
      false,
      'Returns false'
    );
  });

  it('should navigate to /login when #activate and #authorizationService.getToken() is false', () => {
    authorizationServiceSpy.getToken.and.returnValue(undefined);
    spyOn(router, 'navigate').and.stub();

    authorizationGuardService.canActivate();

    expect(router.navigate).toHaveBeenCalledWith(['login']);
  });
});
