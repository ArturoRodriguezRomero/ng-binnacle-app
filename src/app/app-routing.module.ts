import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivitiesComponent } from './modules/activities/pages/activities/activities.component';
import { AuthorizationGuardService } from './core/services/authorization/authorization.guard.service';
import { LoginComponent } from './modules/login/pages/login/login.component';

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
    path: 'home',
    component: ActivitiesComponent,
    canActivate: [AuthorizationGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
