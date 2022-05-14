import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchResultsRoutingModule} from './search-results-routing.module';
import {SearchResultsComponent} from './search-results.component';
import {MatCardModule} from "@angular/material/card";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";


@NgModule({
  declarations: [
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    SearchResultsRoutingModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule
  ]
})
export class SearchResultsModule {
}
