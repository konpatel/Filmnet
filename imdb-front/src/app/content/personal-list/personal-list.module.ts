import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonalListRoutingModule} from './personal-list-routing.module';
import {PersonalListComponent} from './personal-list.component';
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    PersonalListComponent
  ],
  imports: [
    CommonModule,
    PersonalListRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatIconModule
  ]
})
export class PersonalListModule {
}
