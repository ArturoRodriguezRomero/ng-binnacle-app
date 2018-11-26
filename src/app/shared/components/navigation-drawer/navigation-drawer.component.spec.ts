import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationDrawerComponent } from './navigation-drawer.component';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '../../store/user/user.state';
import { NavigationDrawerState } from '../../store/navigation-drawer/navigation-drawer.state';
import { RouterTestingModule } from '@angular/router/testing';
import { HideNaviationDrawer } from '../../store/navigation-drawer/navigation-drawer.actions';
import { UnlockScroll } from '../../store/page-scroll/page-scroll.actions';

describe('NavigationDrawerComponent', () => {
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

  it('should dispatch @Action HideNavigationDrawer when #hideNavigationDrawer', () => {
    spyOn(component.store, 'dispatch').and.callThrough();

    component.hideNavigationDrawer();

    expect(component.store.dispatch).toHaveBeenCalledWith(
      new HideNaviationDrawer()
    );
  });

  it('should dispatch @Action UnlockScroll when #hideNavigationDrawer', () => {
    spyOn(component.store, 'dispatch').and.callThrough();

    component.hideNavigationDrawer();

    expect(component.store.dispatch).toHaveBeenCalledWith(new UnlockScroll());
  });

  it('should Hide Navigation Drawer and UnlockScroll on Binnacle Button Click', () => {
    spyOn(component.store, 'dispatch').and.callThrough();

    component.onBinnacleButtonClick();

    expect(component.store.dispatch).toHaveBeenCalledWith(new UnlockScroll());
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new HideNaviationDrawer()
    );
  });

  it('should Hide Navigation Drawer and UnlockScroll on Logout Click', () => {
    spyOn(component.store, 'dispatch').and.callThrough();

    component.onLogoutClick();

    expect(component.store.dispatch).toHaveBeenCalledWith(new UnlockScroll());
    expect(component.store.dispatch).toHaveBeenCalledWith(
      new HideNaviationDrawer()
    );
  });

  it('should navigate to Activities on Binnacle Button Click', () => {
    spyOn(component.router, 'navigate').and.callThrough();

    component.onBinnacleButtonClick();

    expect(component.router.navigate).toHaveBeenCalledWith(['activities']);
  });

  it('should navigate to Login on Logout Click', () => {
    spyOn(component.router, 'navigate').and.callThrough();

    component.onLogoutClick();

    expect(component.router.navigate).toHaveBeenCalledWith(['login']);
  });
});
