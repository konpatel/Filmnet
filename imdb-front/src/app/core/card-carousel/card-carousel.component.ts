import {Component, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MovieDTO} from "../../interfaces/movieDTO";
import {UserService} from "../../services/user.service";
import {LoginComponent} from "../../content/login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../services/dialog.service";
import {TrailerDialogComponent} from "../trailer-dialog/trailer-dialog.component";

@Component({
  selector: 'app-card-carousel',
  templateUrl: './card-carousel.component.html',
  styleUrls: ['./card-carousel.component.scss']
})
export class CardCarouselComponent implements OnInit {

  @Input() title: string;
  @Input() categoryId?: string;
  @Input() movieList: MovieDTO[] = [];
  responsiveOptions: any[];

  constructor(private router: Router, private userService: UserService,
              public dialog: MatDialog, private dialogService: DialogService) {
    this.responsiveOptions = [
      {
        breakpoint: '1300px',
        numVisible: 4,
        numScroll: 1
      },
      {
        breakpoint: '1050px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '820px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '630px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit() {
  }

  navigateToDetailsPage(id: number) {
    const isLoggedIn: boolean = this.userService.isUserLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['movies-details/', id.toString()]);
    } else {
      this.openLoginDialog(id);
    }
  }

  openLoginDialog(id: number): void {
    this.dialog.open(LoginComponent, this.dialogService.getCustomCssDialog('common-dialog'))
      .afterClosed().subscribe(res => {
      if (res) {
        this.router.navigate(['movies-details/', id.toString()]);
      }
    });
  }

  navigateToCategory(): void {
    this.router.navigate(['category/', this.categoryId]);
  }

}
