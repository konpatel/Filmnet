import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() index: number;
  @Input() selected: number;
  @Input() hover: number;

  constructor() { }

  ngOnInit(): void {
  }

}
