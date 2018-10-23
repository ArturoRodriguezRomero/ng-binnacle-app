import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './modules/activities/pages/activities/activities.component';
import { AuthorizationGuardService } from './core/services/authorization/authorization.guard.service';
import { LoginComponent } from './modules/login/pages/login/login.component';
import { ActivityFormComponent } from './modules/activities/pages/activity-form/activity-form.component';

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
    component: ActivitiesComponent,
    canActivate: [AuthorizationGuardService]
  },
  {
    path: 'activities/new',
    component: ActivityFormComponent,
    canActivate: [AuthorizationGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
