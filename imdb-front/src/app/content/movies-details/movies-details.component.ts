import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../services/dialog.service";
import {TrailerDialogComponent} from "../../core/trailer-dialog/trailer-dialog.component";
import {MovieService} from "../../services/movie.service";
import {MovieDTO} from "../../interfaces/movieDTO";
import {UserService} from "../../services/user.service";
import {UserMovieDTO} from "../../interfaces/userMovieDTO";
import {DataService} from "../../services/data.service";
import {GenreDTO} from "../../interfaces/genreDTO";
import {UserLikesMovieDTO} from "../../interfaces/userLikesMovieDTO";

@Component({
  selector: 'app-movies-details',
  templateUrl: './movies-details.component.html',
  styleUrls: ['./movies-details.component.scss']
})
export class MoviesDetailsComponent implements OnInit {

  movieId: string;
  movie: MovieDTO;
  percent: string;
  releaseDate: string;
  stars = [1, 2, 3, 4, 5];
  hover: number;
  genreEntries = new Set<GenreDTO>();
  isAddToFavourites: boolean;


  constructor(private route: ActivatedRoute, private movieService: MovieService, private dataService: DataService,
              public dialog: MatDialog, private dialogService: DialogService, private userService: UserService) {
  }

  ngOnInit(): void {
    this.getUrlParameter();
  }

  getUrlParameter() {
    this.route.paramMap.subscribe(params => {
      this.movieId = params.get('id');
      this.getMovieById(params.get('id'));
    });
  }

  getMovieById(id: string): void {
    this.movieService.getMovieById(Number(id)).subscribe(data => {
      this.movie = data;
      console.log(data);
      data?.genres.forEach(g => {
        this.genreEntries.add(g);
      });
      this.findIfAlreadyLikedByUser(data);
      this.releaseDate = data.releaseDate.split('-')[0];
      this.percent = (Number(data.voteAverage) * 10).toString();
    });
  }

  findIfAlreadyLikedByUser(movie: MovieDTO): void {
    const userLikesMovie: UserLikesMovieDTO = {
      movieId: movie.id,
      userEmail: this.dataService.get('email')
    }
    this.movieService.findIfAlreadyLikedByUser(userLikesMovie).subscribe(res => {
      this.isAddToFavourites = !!res;
    });
  }

  openTrailerDialog(id: string): void {
    this.dialog.open(TrailerDialogComponent, this.dialogService.getCustomCssDialog('trailer-dialog', id));
  }

  addToFavourites() {
    const userMovie: UserMovieDTO = {
      email: this.dataService.get('email'),
      movieId: this.movie.id
    }
    this.userService.addToFavourites(userMovie).subscribe(res => {
      this.getMovieById(this.movieId);
    });
  }

  removeFromFavourites() {
    const userMovie: UserMovieDTO = {
      email: this.dataService.get('email'),
      movieId: this.movie.id
    }
    this.userService.removeFromFavourites(userMovie).subscribe(res => {
      this.getMovieById(this.movieId);
    });
  }

}
