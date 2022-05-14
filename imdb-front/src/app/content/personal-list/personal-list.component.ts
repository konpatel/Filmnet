import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {DataService} from "../../services/data.service";
import {MovieDTO} from "../../interfaces/movieDTO";
import {Router} from "@angular/router";

@Component({
  selector: 'app-personal-list',
  templateUrl: './personal-list.component.html',
  styleUrls: ['./personal-list.component.scss']
})
export class PersonalListComponent implements OnInit {

  movieSet: Set<MovieDTO> = new Set();
  noDataMessage = false;

  constructor(private userService: UserService, private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.getLikedMovies();
  }

  getLikedMovies(): void {
    this.userService.getFavouriteMovies(this.dataService.get('email')).subscribe(res => {
      if (res.length === 0) {
        this.noDataMessage = true;
      } else {
        this.movieSet = res;
        this.noDataMessage = false;
      }
    });
  }

  navigateToDetailsPage(id: number) {
    const isLoggedIn: boolean = this.userService.isUserLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['movies-details/', id.toString()]);
    }
  }

}
