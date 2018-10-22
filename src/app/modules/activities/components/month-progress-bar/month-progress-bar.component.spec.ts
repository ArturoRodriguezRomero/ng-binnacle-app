import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthProgressBarComponent } from './month-progress-bar.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { HoursAndMinutesPipe } from 'src/app/shared/pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { NgxsModule } from '@ngxs/store';
import { HolidaysState } from 'src/app/shared/store/holidays/holidays.state';
import { CalendarState } from 'src/app/shared/store/calendar/calendar.state';
import { ActivitiesState } from 'src/app/shared/store/activities/activities.state';
import { UserState } from 'src/app/shared/store/user/user.state';
import { HttpClientModule } from '@angular/common/http';
import { NotifierService } from 'angular-notifier';
import { notifierServiceStub } from 'src/app/core/services/__mocks__/notifier.service.stub';

describe('MonthProgressBarComponent', () => {
  let component: MonthProgressBarComponent;
  let fixture: ComponentFixture<MonthProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MonthProgressBarComponent,
        LoadingSpinnerComponent,
        HoursAndMinutesPipe
      ],
      imports: [
        HttpClientModule,
        NgxsModule.forRoot([
          HolidaysState,
          CalendarState,
          ActivitiesState,
          UserState
        ])
      ],
      providers: [
        {
          provide: NotifierService,
          useValue: notifierServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonthProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
