import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { HideNaviationDrawer } from '../../store/navigation-drawer/navigation-drawer.actions';
import { Router } from '@angular/router';
import { UnlockScroll } from '../../store/page-scroll/page-scroll.actions';

@Component({
  selector: 'app-navigation-drawer',
  templateUrl: './navigation-drawer.component.html',
  styleUrls: ['./navigation-drawer.component.css']
})
export class NavigationDrawerComponent implements OnInit {
  @Select(state => state.navigationDrawer.isNavigationDrawerVisible)
  isNavigationDrawerVisible$: Observable<boolean>;

  @Select(state => state.user.user)
  user$: Observable<string>;

  constructor(public store: Store, public router: Router) {}

  ngOnInit() {}

  hideNavigationDrawer() {
    this.store.dispatch(new HideNaviationDrawer());
    this.store.dispatch(new UnlockScroll());
  }

  onBinnacleButtonClick() {
    this.router.navigate(['activities']);
  }

  onLogoutClick() {
    this.hideNavigationDrawer();
    this.router.navigate(['login']);
  }
}
