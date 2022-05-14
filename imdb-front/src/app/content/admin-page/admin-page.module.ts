import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminPageRoutingModule} from './admin-page-routing.module';
import {AdminPageComponent} from './admin-page.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    AdminPageComponent
  ],
  imports: [
    CommonModule,
    AdminPageRoutingModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AdminPageModule {
}
