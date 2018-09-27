import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './pages/activities/activities.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { NavbarModule } from '../../shared/components/navbar/navbar.module';
import { NgxsModule } from '@ngxs/store';
import { UserState } from '../../shared/store/user/user.state';
import { ActivityCardMobileComponent } from './components/activity-card-mobile/activity-card-mobile.component';

@NgModule({
  imports: [CommonModule, NavbarModule],
  declarations: [
    ActivitiesComponent,
    NavbarComponent,
    ActivityCardMobileComponent
  ]
})
export class ActivitiesModule {}
