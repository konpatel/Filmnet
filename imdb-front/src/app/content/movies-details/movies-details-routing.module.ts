import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MoviesDetailsComponent} from './movies-details.component';

const routes: Routes = [{path: '', component: MoviesDetailsComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesDetailsRoutingModule {
}
