import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {Pageable} from "../../interfaces/pageable";
import {PageEvent} from "@angular/material/paginator";
import {MovieDTO} from "../../interfaces/movieDTO";
import {DataService} from "../../services/data.service";
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../services/dialog.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  movieList: MovieDTO[] = [];
  categoryId: string;
  pageSize = 30;
  pageIndex = 0;
  length = 0;

  constructor(private router: Router, private movieService: MovieService, private route: ActivatedRoute,
              private dataService: DataService, public dialog: MatDialog, private dialogService: DialogService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUrlParameter();
  }

  getUrlParameter() {
    this.route.paramMap.subscribe(params => {
      this.categoryId = params.get('id');
      this.getMoviesByGenreId(this.pageSize, this.pageIndex, params.get('id'));
    });
  }

  getMoviesByGenreId(pageSize: number, pageIndex: number, id: string) {
    const pageable: Pageable = {
      pageSize: pageSize,
      pageIndex: pageIndex,
      filter: id
    }
    this.movieService.getItemsWithPagination('/movies/get/genre', pageable).subscribe(data => {
      this.movieList = data.content;
      this.pageIndex = data.number;
      this.pageSize = data.size;
      this.length = data.totalElements;
      this.dataService.gotoTop();
    });
  }

  handlePage(e: PageEvent): void {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getMoviesByGenreId(this.pageSize, this.pageIndex, this.categoryId);
  }

  navigateToDetailsPage(id: number) {
    const isLoggedIn: boolean = this.userService.isUserLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['movies-details/', id.toString()]);
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
