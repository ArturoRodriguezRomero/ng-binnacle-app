import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesContainerComponent } from './activities-container.component';

describe('ActivitiesContainerComponent', () => {
  let component: ActivitiesContainerComponent;
  let fixture: ComponentFixture<ActivitiesContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
