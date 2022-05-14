import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {SearchOptionsGuest, SearchOptionsUser} from "../../interfaces/utils/searchOptions";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchOptionsGuest: any[] = SearchOptionsGuest;
  searchOptionsUser: any[] = SearchOptionsUser;
  searchIcon = 'search';
  interactedWithSearch = false;

  @ViewChild('searchInput') private searchInput: ElementRef;

  searchForm: FormGroup = this.formBuilder.group({
    word: ['']
  });

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUrlParameter();
  }

  getUrlParameter() {
    this.route.queryParams
      .subscribe(params => {
          this.searchForm.get('word').patchValue(params.word);
        }
      );
  }

  updateValue(e: any): void {
    if (e.value) {
      this.router.navigate(['search-results'], {queryParams: {word: e.value.toLowerCase()}});
    } else if (!e.value) {
      this.router.navigate(['home-page']);
    }
  }

  resetForm() {
    this.searchForm.reset();
  }

}
