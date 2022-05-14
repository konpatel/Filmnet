import {Pipe, PipeTransform} from '@angular/core';
import {ReviewDTO} from "../interfaces/reviewDTO";

@Pipe({
  name: 'deleteButton'
})
export class DeleteButtonPipe implements PipeTransform {

  transform(value: boolean, review: ReviewDTO, username: string): unknown {
    return review.author === username || username === 'ihumember';
  }

}
