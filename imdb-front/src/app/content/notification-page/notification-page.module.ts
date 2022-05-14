import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {NotificationPageRoutingModule} from './notification-page-routing.module';
import {NotificationPageComponent} from './notification-page.component';
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [
    NotificationPageComponent
  ],
  imports: [
    CommonModule,
    NotificationPageRoutingModule,
    MatIconModule,
    FlexLayoutModule,
    MatCardModule,
    MatFormFieldModule
  ]
})
export class NotificationPageModule {
}
