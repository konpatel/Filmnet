import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PersonDetailsRoutingModule} from './person-details-routing.module';
import {PersonDetailsComponent} from './person-details.component';
import {HomePageModule} from "../home-page/home-page.module";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {SharedModule} from "../../shared.module";


@NgModule({
  declarations: [
    PersonDetailsComponent
  ],
    imports: [
        CommonModule,
        PersonDetailsRoutingModule,
        HomePageModule,
        MatCardModule,
        MatFormFieldModule,
        MatPaginatorModule,
        FlexLayoutModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        SharedModule
    ]
})
export class PersonDetailsModule {
}
