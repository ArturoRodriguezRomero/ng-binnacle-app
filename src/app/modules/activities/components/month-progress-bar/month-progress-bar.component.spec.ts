import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthProgressBarComponent } from './month-progress-bar.component';

describe('MonthProgressBarComponent', () => {
  let component: MonthProgressBarComponent;
  let fixture: ComponentFixture<MonthProgressBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonthProgressBarComponent ]
    })
    .compileComponents();
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
