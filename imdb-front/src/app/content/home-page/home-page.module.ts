import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomePageRoutingModule} from './home-page-routing.module';
import {HomePageComponent} from './home-page.component';
import {MatButtonModule} from "@angular/material/button";
import {CardCarouselComponent} from "../../core/card-carousel/card-carousel.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatIconModule} from "@angular/material/icon";
import {MatFormFieldModule} from "@angular/material/form-field";
import {CarouselModule} from "primeng/carousel";
import {ButtonModule} from "primeng/button";

@NgModule({
  declarations: [
    HomePageComponent,
    CardCarouselComponent,
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatButtonModule,
    MatPaginatorModule,
    MatCardModule,
    FlexLayoutModule,
    ScrollingModule,
    MatIconModule,
    MatFormFieldModule,
    CarouselModule,
    ButtonModule
  ],
  exports: [
    CardCarouselComponent
  ],
  providers: []
})
export class HomePageModule {
}
