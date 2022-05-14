import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pageable} from "../interfaces/pageable";
import {MovieDTO} from "../interfaces/movieDTO";
import {YearCounter} from "../interfaces/yearCounter";
import {UserLikesMovieDTO} from "../interfaces/userLikesMovieDTO";
import {environment} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  getItemsWithPagination(url: string, pageable: Pageable): Observable<any> {
    const headers: HttpHeaders = this.initialiseHeaders();
    let params = new HttpParams();
    if (pageable.filter) {
      params = params.append('filterValue', pageable.filter.toString());
    }
    params = params.append('page', pageable.pageIndex?.toString());
    params = params.append('size', pageable.pageSize?.toString());

    return this.http.get(this.baseUrl + url, {params, headers});
  }

  initialiseHeaders() {
    return new HttpHeaders();
  }

  getMovieById(id: number): Observable<MovieDTO> {
    return this.http.get(this.baseUrl + '/lock/movies/get/' + `${id}`) as Observable<MovieDTO>;
  }

  getTopMoviesByVoteAverage(): Observable<MovieDTO[]> {
    return this.http.get(this.baseUrl + '/get/top/voted/movies') as Observable<MovieDTO[]>;
  }

  getUpComingMovies(): Observable<MovieDTO[]> {
    return this.http.get(this.baseUrl + '/movies/get/up-coming') as Observable<MovieDTO[]>;
  }

  getMoviesByYear(): Observable<YearCounter[]> {
    return this.http.get(this.baseUrl + '/get/year/movies') as Observable<YearCounter[]>;
  }

  findIfAlreadyLikedByUser(userLikesMovie: UserLikesMovieDTO): Observable<UserLikesMovieDTO> {
    return this.http.post(this.baseUrl + '/lock/movies/likes', userLikesMovie) as Observable<UserLikesMovieDTO>;
  }

}
