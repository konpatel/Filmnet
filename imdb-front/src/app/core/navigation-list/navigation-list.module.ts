import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationListRoutingModule } from './navigation-list-routing.module';
import { NavigationListComponent } from './navigation-list.component';
import {SecurityModule} from "../authorized-guard/security/security.module";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatBadgeModule} from "@angular/material/badge";


@NgModule({
  declarations: [
    NavigationListComponent
  ],
  exports: [
    NavigationListComponent
  ],
    imports: [
        CommonModule,
        NavigationListRoutingModule,
        SecurityModule,
        MatIconModule,
        MatListModule,
        MatBadgeModule
    ]
})
export class NavigationListModule { }
