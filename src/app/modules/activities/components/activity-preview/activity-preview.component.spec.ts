import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityPreviewComponent } from './activity-preview.component';

describe('ActivityPreviewComponent', () => {
  let component: ActivityPreviewComponent;
  let fixture: ComponentFixture<ActivityPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
