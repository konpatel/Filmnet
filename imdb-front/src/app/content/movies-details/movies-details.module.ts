import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MoviesDetailsRoutingModule} from './movies-details-routing.module';
import {MoviesDetailsComponent} from './movies-details.component';
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {ReviewModule} from "../review/review.module";


@NgModule({
  declarations: [
    MoviesDetailsComponent
  ],
  imports: [
    CommonModule,
    MoviesDetailsRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    ReviewModule,
  ]
})
export class MoviesDetailsModule {
}
