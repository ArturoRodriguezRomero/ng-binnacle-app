import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticationGuardService } from './core/services/authentication/authentication.guard.service';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { ActivityFormComponent } from './modules/activities/pages/activity-form/activity-form.component';
import { ActivitiesContainerComponent } from './modules/activities/pages/activities-container/activities-container.component';
import { ActivitiesComponent } from './modules/activities/pages/activities/activities.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'activities',
    component: ActivitiesContainerComponent,
    canActivate: [AuthenticationGuardService],
    children: [
      {
        path: '',
        component: ActivitiesComponent,
        canActivate: [AuthenticationGuardService]
      },
      {
        path: 'new',
        component: ActivityFormComponent,
        canActivate: [AuthenticationGuardService]
      },
      {
        path: ':id',
        component: ActivityFormComponent,
        canActivate: [AuthenticationGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
