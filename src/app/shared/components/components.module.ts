import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule } from './navbar/navbar.module';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@NgModule({
  imports: [CommonModule, NavbarModule],
  declarations: [LoadingSpinnerComponent],
  exports: [NavbarModule, LoadingSpinnerComponent]
})
export class ComponentsModule {}
