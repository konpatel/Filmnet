import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RatingRoutingModule } from './rating-routing.module';
import { RatingComponent } from './rating.component';
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    RatingComponent
  ],
  exports: [
    RatingComponent
  ],
    imports: [
        CommonModule,
        RatingRoutingModule,
        MatIconModule
    ]
})
export class RatingModule { }
