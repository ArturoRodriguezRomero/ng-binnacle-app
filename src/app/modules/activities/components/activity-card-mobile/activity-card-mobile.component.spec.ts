import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityCardMobileComponent } from './activity-card-mobile.component';

describe('ActivityCardMobileComponent', () => {
  let component: ActivityCardMobileComponent;
  let fixture: ComponentFixture<ActivityCardMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityCardMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityCardMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
