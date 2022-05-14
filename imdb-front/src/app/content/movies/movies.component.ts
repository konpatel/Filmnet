import {Component, OnInit} from '@angular/core';
import {MovieService} from "../../services/movie.service";
import {MovieDTO} from "../../interfaces/movieDTO";
import {Pageable} from "../../interfaces/pageable";

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  pageable: Pageable = {
    pageSize: 20,
    pageIndex: 0
  };

  popularMoviesList: MovieDTO[] = [];
  upComingMoviesList: MovieDTO[] = [];
  topRatedMoviesList: MovieDTO[] = [];
  adventureMoviesList: MovieDTO[] = [];
  fantasyMoviesList: MovieDTO[] = [];
  animationMoviesList: MovieDTO[] = [];
  dramaMoviesList: MovieDTO[] = [];
  horrorMoviesList: MovieDTO[] = [];
  actionMoviesList: MovieDTO[] = [];
  comedyMoviesList: MovieDTO[] = [];
  historyMoviesList: MovieDTO[] = [];
  westernMoviesList: MovieDTO[] = [];
  thrillerMoviesList: MovieDTO[] = [];
  crimeMoviesList: MovieDTO[] = [];
  documentaryMoviesList: MovieDTO[] = [];
  scienceFictionMoviesList: MovieDTO[] = [];
  mysteryMoviesList: MovieDTO[] = [];
  musicMoviesList: MovieDTO[] = [];
  romanceMoviesList: MovieDTO[] = [];
  familyMoviesList: MovieDTO[] = [];
  warMoviesList: MovieDTO[] = [];
  tvMoviesList: MovieDTO[] = [];


  constructor(private movieService: MovieService) {
  }

  ngOnInit(): void {
    this.getPopularMovies();
    this.getUpComingMovies();
    this.getTopRatedMovies();
    this.getAdventureMovies(12);
    this.getFantasyMovies(14);
    this.getAnimationMovies(16);
    this.getDramaMovies(18);
    this.getHorrorMovies(27);
    this.getActionMovies(28);
    this.getComedyMovies(35);
    this.getHistoryMovies(36);
    this.getWesternMovies(37);
    this.getThrillerMovies(53);
    this.getCrimeMovies(80);
    this.getDocumentaryMovies(99);
    this.getScienceFictionMovies(878);
    this.getMysteryMovies(9648);
    this.getMusicMovies(10402);
    this.getRomanceMovies(10749);
    this.getFamilyMovies(10751);
    this.getWarMovies(10752);
    this.getTVMovieMovies(10770);
  }

  getPopularMovies() {
    this.movieService.getItemsWithPagination('/movies/get/popular', this.pageable).subscribe(data => {
      this.popularMoviesList = data.content;
    });
  }

  getUpComingMovies() {
    this.movieService.getUpComingMovies().subscribe(data => {
      this.upComingMoviesList = data;
    });
  }

  getTopRatedMovies() {
    this.movieService.getItemsWithPagination('/movies/get/top-rated', this.pageable).subscribe(data => {
      this.topRatedMoviesList = data.content;
    });
  }

  getAdventureMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.adventureMoviesList = data.content;
    });
  }

  getFantasyMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.fantasyMoviesList = data.content;
    });
  }

  getAnimationMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.animationMoviesList = data.content;
    });
  }

  getDramaMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.dramaMoviesList = data.content;
    });
  }

  getHorrorMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.horrorMoviesList = data.content;
    });
  }

  getActionMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.actionMoviesList = data.content;
    });
  }

  getComedyMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.comedyMoviesList = data.content;
    });
  }

  getHistoryMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.historyMoviesList = data.content;
    });
  }

  getWesternMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.westernMoviesList = data.content;
    });
  }

  getThrillerMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.thrillerMoviesList = data.content;
    });
  }

  getCrimeMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.crimeMoviesList = data.content;
    });
  }

  getDocumentaryMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.documentaryMoviesList = data.content;
    });
  }

  getScienceFictionMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.scienceFictionMoviesList = data.content;
    });
  }

  getMysteryMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.mysteryMoviesList = data.content;
    });
  }

  getMusicMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.musicMoviesList = data.content;
    });
  }

  getRomanceMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.romanceMoviesList = data.content;
    });
  }

  getFamilyMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.familyMoviesList = data.content;
    });
  }

  getWarMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.warMoviesList = data.content;
    });
  }

  getTVMovieMovies(id: number) {
    this.pageable.filter = id.toString();
    this.movieService.getItemsWithPagination('/movies/get/genre', this.pageable).subscribe(data => {
      this.tvMoviesList = data.content;
    });
  }

}
