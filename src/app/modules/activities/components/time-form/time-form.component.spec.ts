import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeFormComponent } from './time-form.component';

describe('TimeFormComponent', () => {
  let component: TimeFormComponent;
  let fixture: ComponentFixture<TimeFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
