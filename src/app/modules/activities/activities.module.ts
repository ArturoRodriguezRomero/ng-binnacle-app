import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './pages/activities/activities.component';

import { ActivityCardMobileComponent } from './components/activity-card-mobile/activity-card-mobile.component';
import { DayMobileComponent } from './components/day-mobile/day-mobile.component';
import { MonthProgressBarComponent } from './components/month-progress-bar/month-progress-bar.component';
import { HoursAndMinutesPipe } from '../../shared/pipes/hours.and.minutes.pipe/hours.and.minutes.pipe';
import { CalculateEndDatePipe } from '../../shared/pipes/calculate.end.date.pipe/calculate.end.date.pipe';
import { IsSundayPipe } from '../../shared/pipes/is.sunday.pipe/is.sunday.pipe';
import { TruncatePipe } from '../../shared/pipes/truncate.pipe/truncate.pipe';
import { WeekSeparatorComponent } from './components/week-separator/week-separator.component';
import { ComponentsModule } from '../../shared/components/components.module';
import { CalendarMenuComponent } from './components/calendar-menu/calendar-menu.component';
import { ActivityPreviewComponent } from './components/activity-preview/activity-preview.component';
import { LongPressDirective } from 'src/app/shared/directives/long.press.directive/long.press.directive';
import { ActivityFormComponent } from './pages/activity-form/activity-form.component';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { IsMondayPipe } from 'src/app/shared/pipes/is.monday.pipe/is.monday.pipe';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProjectFormComponent } from './components/project-form/project-form.component';
import { TimeFormComponent } from './components/time-form/time-form.component';
import { TextareaAutosizeModule } from 'ngx-textarea-autosize';

@NgModule({
  imports: [
    CommonModule,
    ComponentsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    TextareaAutosizeModule
  ],
  declarations: [
    ActivitiesComponent,
    ActivityCardMobileComponent,
    DayMobileComponent,
    MonthProgressBarComponent,
    HoursAndMinutesPipe,
    CalculateEndDatePipe,
    IsSundayPipe,
    WeekSeparatorComponent,
    CalendarMenuComponent,
    ActivityPreviewComponent,
    LongPressDirective,
    TruncatePipe,
    ActivityFormComponent,
    IsMondayPipe,
    ProjectFormComponent,
    TimeFormComponent
  ]
})
export class ActivitiesModule {}
