import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {Pageable} from "../../interfaces/pageable";
import {MovieDTO} from "../../interfaces/movieDTO";
import {DataService} from "../../services/data.service";
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../services/dialog.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {

  filterValue: string;
  tempFilterValue: string;
  resultsArray: MovieDTO[] = [];
  pageSize = 30;
  pageIndex = 0;
  length = 0;
  noDataMessage = false;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  obs: Observable<any>;
  dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  constructor(private changeDetectorRef: ChangeDetectorRef, private route: ActivatedRoute,
              private movieService: MovieService, private router: Router, private dataService: DataService,
              public dialog: MatDialog, private dialogService: DialogService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.getUrlParameter();
    this.changeDetectorRef.detectChanges();
  }

  getUrlParameter() {
    this.pageSize = 30;
    this.pageIndex = 0;
    this.length = 0;
    this.route.queryParams
      .subscribe(params => {
          this.filterValue = params.word;
          this.compareFilterValue(params.word);
        }
      );
  }

  compareFilterValue(val: string): void {
    if (this.filterValue !== this.tempFilterValue) {
      this.pageSize = 30;
      this.pageIndex = 0;
      this.length = 0;
      this.tempFilterValue = this.filterValue;
    }
    this.getMultiSearchResults(this.pageSize, this.pageIndex, val);
  }

  getMultiSearchResults(pageSize: number, pageIndex: number, filter: string) {
    const pageable: Pageable = {
      pageSize: pageSize,
      pageIndex: pageIndex,
      filter: filter
    }
    this.movieService.getItemsWithPagination('/movies/get/searched/results', pageable).subscribe(data => {
      if (data.content.length === 0) {
        this.noDataMessage = true;
      } else {
        this.resultsArray = data.content;
        this.noDataMessage = false;
        this.pageIndex = data.number;
        this.pageSize = data.size;
        this.length = data.totalElements;
        this.dataService.gotoTop();
      }
    });
  }

  handlePage(e: PageEvent): void {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getMultiSearchResults(this.pageSize, this.pageIndex, this.filterValue);
  }

  navigateToDetailsPage(id: number) {
    const isLoggedIn: boolean = this.userService.isUserLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['movies-details/', id]);
    } else {
      this.openLoginDialog();
    }
  }

  openLoginDialog(): void {
    this.dialog.open(LoginComponent, this.dialogService.getCustomCssDialog('common-dialog'))
      .afterClosed().subscribe(res => {
      if (res) {
        // Do nothing
      }
    });
  }

}
