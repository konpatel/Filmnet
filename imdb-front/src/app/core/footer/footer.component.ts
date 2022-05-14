import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchComponent} from "../search/search.component";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  currentYear: any;
  @ViewChild('searchComp', {static: true}) private searchComp: SearchComponent;

  constructor() {
  }

  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
  }

  clickLinks(): void {
    this.searchComp?.resetForm();
  }

}
