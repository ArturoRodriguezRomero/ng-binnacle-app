import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDrawerComponent } from './navigation-drawer.component';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '../../store/user/user.state';
import { NavigationDrawerState } from '../../store/navigation-drawer/navigation-drawer.state';
import { RouterTestingModule } from '@angular/router/testing';

fdescribe('NavigationDrawerComponent', () => {
  let component: NavigationDrawerComponent;
  let fixture: ComponentFixture<NavigationDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationDrawerComponent],
      imports: [
        NgxsModule.forRoot([UserState, NavigationDrawerState]),
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
