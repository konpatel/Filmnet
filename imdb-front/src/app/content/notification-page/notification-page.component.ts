import {Component, OnInit} from '@angular/core';
import {DataService} from "../../services/data.service";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {MovieDTO} from "../../interfaces/movieDTO";

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.scss']
})
export class NotificationPageComponent implements OnInit {

  notificationList: MovieDTO[] = [];
  noDataMessage = false;

  constructor(private userService: UserService, private dataService: DataService, private router: Router) {
  }

  ngOnInit(): void {
    this.checkNotifications(this.dataService.get('notifications'));
  }

  navigateToDetailsPage(id: number) {
    const isLoggedIn: boolean = this.userService.isUserLoggedIn();
    if (isLoggedIn) {
      this.router.navigate(['movies-details/', id.toString()]);
    }
  }

  checkNotifications(notifications: any): void {
    if (notifications.length === 0) {
      this.noDataMessage = true;
    } else {
      this.notificationList = notifications;
      this.noDataMessage = false;
    }
  }

}
