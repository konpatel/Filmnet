import {Component, HostListener, Input, OnInit} from '@angular/core';
import {MovieDTO} from "../../interfaces/movieDTO";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserReviewDTO} from "../../interfaces/userReviewDTO";
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";
import {MovieService} from "../../services/movie.service";
import {NotificationService} from "../../services/notification.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../services/dialog.service";
import {ConfirmDialogComponent} from "../../core/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  @Input() movie: MovieDTO;

  stars = [1, 2, 3, 4, 5];
  selected: number;
  hover: number;
  existsDeleteButton: boolean;
  username: string;
  mobileSize = false;

  reviewForm: FormGroup = this.formBuilder.group({
    id: [],
    email: [],
    review: [],
    rating: [],
    movie: []
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private notificationService: NotificationService,
              private dataService: DataService, private movieService: MovieService, public dialog: MatDialog, private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.username = this.dataService.get('username');
    this.getScreenSize();
  }

  @HostListener("window:resize")
  getScreenSize() {
    this.mobileSize = window.innerWidth <= 500;
  }

  postReview(): void {
    const userReview: UserReviewDTO = this.reviewForm.value;
    userReview.movieId = this.movie.id;
    userReview.rating = this.selected;
    userReview.email = this.dataService.get('email');
    this.userService.saveUserReview(userReview).subscribe(() => {
      this.getMovieById();
      this.reviewForm.reset();
      this.selected = null;
      this.notificationService.showSuccess('You have reviewed this movie successfully');
    });
  }

  getMovieById(): void {
    this.movieService.getMovieById(Number(this.movie.id)).subscribe(data => {
      this.movie = data;
      console.log(data);
    });
  }

  deletePost(id: string): void {
    this.userService.deletePost(id).subscribe(res => {
      this.getMovieById();
      this.notificationService.showSuccess('Review has been deleted successfully');
    });
  }

  openConfirmDialog(id: string) {
    this.dialog.open(ConfirmDialogComponent, this.dialogService.getCustomCssDialog('confirm-dialog', 'Are you sure you want to delete this review?'))
      .afterClosed().subscribe(res => {
      if (res) {
        this.deletePost(id);
      }
    });
  }

}
