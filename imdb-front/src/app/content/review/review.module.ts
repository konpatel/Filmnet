import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ReviewRoutingModule} from './review-routing.module';
import {ReviewComponent} from './review.component';
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {RatingModule} from "../rating/rating.module";
import {SharedModule} from "../../shared.module";


@NgModule({
  declarations: [
    ReviewComponent
  ],
  exports: [
    ReviewComponent
  ],
  imports: [
    CommonModule,
    ReviewRoutingModule,
    MatCardModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RatingModule,
    SharedModule
  ]
})
export class ReviewModule {
}
