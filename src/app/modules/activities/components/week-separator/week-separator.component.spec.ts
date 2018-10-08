import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekSeparatorComponent } from './week-separator.component';

describe('WeekSeparatorComponent', () => {
  let component: WeekSeparatorComponent;
  let fixture: ComponentFixture<WeekSeparatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeekSeparatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeekSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
