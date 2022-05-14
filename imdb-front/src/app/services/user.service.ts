import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDTO} from "../interfaces/userDTO";
import {Observable} from "rxjs";
import {UserReviewDTO} from "../interfaces/userReviewDTO";
import {UserMovieDTO} from "../interfaces/userMovieDTO";
import {UserTokenDTO} from "../interfaces/userTokenDTO";
import {environment} from "../../environments/environment";
import {MovieDTO} from "../interfaces/movieDTO";
import {UserEmailDTO} from "../interfaces/userEmailDTO";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) {
  }

  public registerUser(user: UserDTO): Observable<any> {
    return this.http.post(this.baseUrl + '/user/register', user) as Observable<any>;
  }

  public loginUser(user: UserDTO): Observable<any> {
    return this.http.post(this.baseUrl + '/user/login', user) as Observable<any>;
  }

  public getUsername(email: string): Observable<UserDTO> {
    return this.http.get(this.baseUrl + '/lock/get/user/' + `${email}`) as Observable<UserDTO>;
  }

  public logout(): Observable<any> {
    return this.http.get(this.baseUrl + '/lock/user/sign-out-user') as Observable<any>;
  }

  public isUserLoggedIn(): boolean {
    const user = sessionStorage.getItem('AUTH-TOKEN');
    return user !== null;
  }

  public getNotifications(count: number): Observable<MovieDTO> {
    return this.http.get(this.baseUrl + '/lock/user/notifications/'+ `${count.toString()}`) as Observable<MovieDTO>;
  }

  public closeAccount(email: string): Observable<any> {
    return this.http.get(this.baseUrl + '/lock/user/' + `${email}`) as Observable<any>;
  }

  public saveUserReview(userReviewDTO: UserReviewDTO): Observable<any> {
    return this.http.post(this.baseUrl + '/lock/user/save/review', userReviewDTO) as Observable<any>;
  }

  public addToFavourites(userMovieDTO: UserMovieDTO): Observable<any> {
    return this.http.post(this.baseUrl + '/lock/user/likes/movie', userMovieDTO) as Observable<any>;
  }

  public removeFromFavourites(userMovieDTO: UserMovieDTO): Observable<any> {
    return this.http.post(this.baseUrl + '/lock/user/remove/likes/movie', userMovieDTO) as Observable<any>;
  }

  public getFavouriteMovies(email: string): Observable<any> {
    return this.http.get(this.baseUrl + '/lock/user/get/liked/movies/' + `${email}`) as Observable<any>;
  }

  public deletePost(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + '/lock/delete/post/' + `${id}`) as Observable<any>;
  }

  public getAllInactiveUsers(): Observable<any> {
    return this.http.get(this.baseUrl + '/lock/get/inactive/users') as Observable<any>;
  }

  public deleteUser(email: string): Observable<any> {
    return this.http.get(this.baseUrl + '/lock/delete/user/' + `${email}`) as Observable<any>;
  }

  public sendEmail(userEmailDTO: UserEmailDTO): Observable<any> {
    return this.http.post(this.baseUrl + '/user/forgot/password', userEmailDTO) as Observable<any>;
  }

  public saveNewPassword(userToken: UserTokenDTO): Observable<any> {
    return this.http.post(this.baseUrl + '/user/new/password', userToken) as Observable<any>;
  }

}
