import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {Pageable} from "../../interfaces/pageable";
import {MovieDTO} from "../../interfaces/movieDTO";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  popularMoviesList: MovieDTO[] = [];
  upComingMoviesList: MovieDTO[] = [];
  topRatedMoviesList: MovieDTO[] = [];
  latestMoviesList: MovieDTO[] = [];

  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getPopularMovies(20, 0);
    this.getUpComingMovies();
    this.getTopRatedMovies(20, 0);
    this.getLatestMovie(20, 0);
  }

  getPopularMovies(pageSize: number, pageIndex: number) {
    const pageable: Pageable = {
      pageSize: pageSize,
      pageIndex: pageIndex
    }
    this.movieService.getItemsWithPagination('/movies/get/popular', pageable).subscribe(data => {
      this.popularMoviesList = data.content;
    });
  }

  getLatestMovie(pageSize: number, pageIndex: number) {
    const pageable: Pageable = {
      pageSize: pageSize,
      pageIndex: pageIndex
    }
    this.movieService.getItemsWithPagination('/movies/get/latest', pageable).subscribe(data => {
      this.latestMoviesList = data.content;
    });
  }

  getUpComingMovies() {
    this.movieService.getUpComingMovies().subscribe(data => {
      this.upComingMoviesList = data;
    });
  }

  getTopRatedMovies(pageSize: number, pageIndex: number) {
    const pageable: Pageable = {
      pageSize: pageSize,
      pageIndex: pageIndex
    }
    this.movieService.getItemsWithPagination('/movies/get/top-rated', pageable).subscribe(data => {
      this.topRatedMoviesList = data.content;
    });
  }

}
