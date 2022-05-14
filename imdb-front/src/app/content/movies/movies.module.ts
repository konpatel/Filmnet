import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MoviesRoutingModule} from './movies-routing.module';
import {MoviesComponent} from './movies.component';
import {HomePageModule} from "../home-page/home-page.module";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    MoviesComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    HomePageModule,
    MatIconModule
  ]
})
export class MoviesModule {
}
