import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './pages/activities/activities.component';

import { ActivityCardMobileComponent } from './components/activity-card-mobile/activity-card-mobile.component';
import { DayMobileComponent } from './components/day-mobile/day-mobile.component';
import { MonthProgressBarComponent } from './components/month-progress-bar/month-progress-bar.component';
import { HoursAndMinutesPipe } from '../../shared/pipes/hours.and.minutes.pipe';
import { CalculateEndDatePipe } from '../../shared/pipes/calculate.end.date.pipe';
import { IsSundayPipe } from '../../shared/pipes/is.sunday.pipe';
import { WeekSeparatorComponent } from './components/week-separator/week-separator.component';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { ComponentsModule } from '../../shared/components/components.module';

@NgModule({
  imports: [CommonModule, ComponentsModule],
  declarations: [
    ActivitiesComponent,
    ActivityCardMobileComponent,
    DayMobileComponent,
    MonthProgressBarComponent,
    HoursAndMinutesPipe,
    CalculateEndDatePipe,
    IsSundayPipe,
    WeekSeparatorComponent
  ]
})
export class ActivitiesModule {}
