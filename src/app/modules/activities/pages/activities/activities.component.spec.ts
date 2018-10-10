import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesComponent } from './activities.component';
import { MonthProgressBarComponent } from '../../components/month-progress-bar/month-progress-bar.component';
import { LoadingSpinnerComponent } from 'src/app/shared/components/loading-spinner/loading-spinner.component';
import { DayMobileComponent } from '../../components/day-mobile/day-mobile.component';
import { IsSundayPipe } from 'src/app/shared/pipes/is.sunday.pipe';
import { WeekSeparatorComponent } from '../../components/week-separator/week-separator.component';
import { HoursAndMinutesPipe } from 'src/app/shared/pipes/hours.and.minutes.pipe';
import { ActivityCardMobileComponent } from '../../components/activity-card-mobile/activity-card-mobile.component';
import { CalculateEndDatePipe } from 'src/app/shared/pipes/calculate.end.date.pipe';
import { NgxsModule } from '@ngxs/store';
import { ActivitiesState } from 'src/app/shared/store/activities/activities.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotifierService } from 'angular-notifier';

describe('ActivitiesComponent', () => {
  let component: ActivitiesComponent;
  let fixture: ComponentFixture<ActivitiesComponent>;

  let notifierServiceStub = { notify: () => {} };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivitiesComponent,
        MonthProgressBarComponent,
        LoadingSpinnerComponent,
        DayMobileComponent,
        IsSundayPipe,
        WeekSeparatorComponent,
        HoursAndMinutesPipe,
        ActivityCardMobileComponent,
        CalculateEndDatePipe
      ],
      imports: [NgxsModule.forRoot([ActivitiesState]), HttpClientTestingModule],
      providers: [
        {
          provide: NotifierService,
          useValue: notifierServiceStub
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
