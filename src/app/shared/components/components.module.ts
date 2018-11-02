import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NavigationDrawerComponent } from './navigation-drawer/navigation-drawer.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoadingSpinnerComponent, NavigationDrawerComponent],
  exports: [LoadingSpinnerComponent, NavigationDrawerComponent]
})
export class ComponentsModule {}
