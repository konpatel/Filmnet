import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mathFloor'
})
export class MathFloorPipe implements PipeTransform {

  transform(value: number): unknown {
    return Math.floor(value);
  }

}
