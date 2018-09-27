import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationDrawerComponent } from '../navigation-drawer/navigation-drawer.component';
import { SlidingCalendarComponent } from '../sliding-calendar/sliding-calendar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [NavigationDrawerComponent, SlidingCalendarComponent],
  exports: [SlidingCalendarComponent, NavigationDrawerComponent]
})
export class NavbarModule {}
