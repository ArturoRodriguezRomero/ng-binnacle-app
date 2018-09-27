import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayMobileComponent } from './day-mobile.component';

describe('DayMobileComponent', () => {
  let component: DayMobileComponent;
  let fixture: ComponentFixture<DayMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayMobileComponent ]
    })
    .compileComponents();
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
