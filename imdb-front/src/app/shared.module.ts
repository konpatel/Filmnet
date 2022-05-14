import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SafePipe} from "./pipes/safe.pipe";
import {DeleteButtonPipe} from "./pipes/delete-button.pipe";
import {MathFloorPipe} from "./pipes/math-floor.pipe";


@NgModule({
  declarations: [SafePipe, DeleteButtonPipe, MathFloorPipe],
  imports: [
    CommonModule
  ],
  exports: [SafePipe, DeleteButtonPipe, MathFloorPipe]
})
export class SharedModule {
}
