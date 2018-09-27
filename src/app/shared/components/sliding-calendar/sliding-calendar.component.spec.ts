import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidingCalendarComponent } from './sliding-calendar.component';

describe('SlidingCalendarComponent', () => {
  let component: SlidingCalendarComponent;
  let fixture: ComponentFixture<SlidingCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlidingCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidingCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
