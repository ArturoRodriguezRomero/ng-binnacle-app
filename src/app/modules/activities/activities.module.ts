import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './pages/activities/activities.component';

import { ActivityCardMobileComponent } from './components/activity-card-mobile/activity-card-mobile.component';
import { DayMobileComponent } from './components/day-mobile/day-mobile.component';
import { MonthProgressBarComponent } from './components/month-progress-bar/month-progress-bar.component';

@NgModule({
  imports: [CommonModule],
  declarations: [ActivitiesComponent, ActivityCardMobileComponent, DayMobileComponent, MonthProgressBarComponent]
})
export class ActivitiesModule {}
