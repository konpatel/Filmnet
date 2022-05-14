import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterPageRoutingModule} from './register-page-routing.module';
import {RegisterPageComponent} from './register-page.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    RegisterPageComponent
  ],
  exports: [
    RegisterPageComponent
  ],
  imports: [
    CommonModule,
    RegisterPageRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule
  ]
})
export class RegisterPageModule { }
