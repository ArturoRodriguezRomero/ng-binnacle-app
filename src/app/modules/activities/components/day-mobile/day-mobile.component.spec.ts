import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayMobileComponent } from './day-mobile.component';
import { HoursAndMinutesPipe } from 'src/app/shared/pipes/hours.and.minutes.pipe';
import { ActivityCardMobileComponent } from '../activity-card-mobile/activity-card-mobile.component';
import { CalculateEndDatePipe } from 'src/app/shared/pipes/calculate.end.date.pipe';

describe('DayMobileComponent', () => {
  let component: DayMobileComponent;
  let fixture: ComponentFixture<DayMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DayMobileComponent,
        HoursAndMinutesPipe,
        ActivityCardMobileComponent,
        CalculateEndDatePipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
