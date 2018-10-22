import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LongPressDirective } from './long.press.directive';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  template: `<div long-press [duration]="300" ((onLongPress)="onLongPress()" (onLongPressEnd)="onLongPressEnd()"></div>`
})
class TestLongPressDirectiveComponent {
  onLongPress() {
    console.log('onLongPress');
  }
  onLongPressEnd() {
    console.log('onLongPressEnd');
  }
}

describe('Long Press Directive', () => {
  let component: TestLongPressDirectiveComponent;
  let fixture: ComponentFixture<TestLongPressDirectiveComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LongPressDirective, TestLongPressDirectiveComponent]
    });

    fixture = TestBed.createComponent(TestLongPressDirectiveComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement.query(By.css('div'));

    spyOn(component, 'onLongPress').and.callThrough();
    spyOn(component, 'onLongPressEnd').and.callThrough();
  });
});
