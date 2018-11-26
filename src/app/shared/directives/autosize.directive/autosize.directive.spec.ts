import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AutosizeDirective } from './autosize.directive';

@Component({
  template: `
    <div
      appLongPress
      [duration]="300"
      ((onLongPress)="onLongPress()"
      (onLongPressEnd)="onLongPressEnd()"
    ></div>
  `
})
class TestAutosizeDirectiveComponent {
  input() {}
}

describe('Long Press Directive', () => {
  let component: TestAutosizeDirectiveComponent;
  let fixture: ComponentFixture<TestAutosizeDirectiveComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutosizeDirective, TestAutosizeDirectiveComponent]
    });

    fixture = TestBed.createComponent(TestAutosizeDirectiveComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('div'));

    spyOn(component, 'input').and.callThrough();
  });
});
