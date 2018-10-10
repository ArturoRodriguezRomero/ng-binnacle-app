import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCardMobileComponent } from './activity-card-mobile.component';
import { CalculateEndDatePipe } from 'src/app/shared/pipes/calculate.end.date.pipe';
import { HoursAndMinutesPipe } from 'src/app/shared/pipes/hours.and.minutes.pipe';
import { ModelsMock } from 'src/app/shared/__mocks__/models.mock';

describe('ActivityCardMobileComponent', () => {
  let component: ActivityCardMobileComponent;
  let fixture: ComponentFixture<ActivityCardMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ActivityCardMobileComponent,
        CalculateEndDatePipe,
        HoursAndMinutesPipe
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCardMobileComponent);
    component = fixture.componentInstance;
    component.activity = ModelsMock.Activity;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
