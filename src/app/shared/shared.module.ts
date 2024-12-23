import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { NavbarComponent } from './components/navbar/navbar.component';
@NgModule({
  declarations: [
    SearchBarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchBarComponent,
    NavbarComponent
  ]
})
export class SharedModule { }