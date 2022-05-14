import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../services/movie.service";
import {Pageable} from "../../interfaces/pageable";
import {CrewDTO} from "../../interfaces/crewDTO";
import {UserService} from "../../services/user.service";
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../services/dialog.service";
import {DataService} from "../../services/data.service";

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {

  popularPeopleList: CrewDTO[] = [];
  pageSize = 30;
  pageIndex = 0;
  length = 0;
  jobParameter: string;
  title: string;

  constructor(private router: Router, private movieService: MovieService, private route: ActivatedRoute,
              private userService: UserService, public dialog: MatDialog, private dialogService: DialogService,
              private dataService: DataService) {
  }

  ngOnInit(): void {
    this.getUrlParameter();
  }

  getUrlParameter() {
    this.route.paramMap.subscribe(params => {
      this.jobParameter = params.get('job');
      this.getPopularPeople(this.pageSize, this.pageIndex, params.get('job'));
      if (params.get('job') === 'Acting') {
        this.title = 'Actors';
      } else {
        this.title = 'Directors';
      }
    });
  }

  getPopularPeople(pageSize: number, pageIndex: number, job: string) {
    const pageable: Pageable = {
      pageSize: pageSize,
      pageIndex: pageIndex,
      filter: job
    }
    this.movieService.getItemsWithPagination('/crew/get/popular-people', pageable).subscribe(data => {
      this.popularPeopleList = data.content;
      this.pageIndex = data.number;
      this.pageSize = data.size;
      this.length = data.totalElements;
      this.dataService.gotoTop();
    });
  }

  handlePage(e: PageEvent): void {
    this.pageIndex = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getPopularPeople(this.pageSize, this.pageIndex, this.jobParameter);
  }

  navigateToDetailsPage(id: number) {
    const isLoggedIn: boolean = this.userService.isUserLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['person-details/', id.toString()]);
    } else {
      this.openLoginDialog(id);
    }
  }

  openLoginDialog(id: number): void {
    this.dialog.open(LoginComponent, this.dialogService.getCustomCssDialog('common-dialog'))
      .afterClosed().subscribe(res => {
      if (res) {
        this.router.navigate(['person-details/', id.toString()]);
      }
    });
  }

}
