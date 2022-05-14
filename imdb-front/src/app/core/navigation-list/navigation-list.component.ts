import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../services/user.service";
import {MatSidenav} from "@angular/material/sidenav";
import {Router} from "@angular/router";
import {SecurityService} from "../authorized-guard/security.service";
import {DataService} from "../../services/data.service";
import {SearchComponent} from "../search/search.component";
import {LoginComponent} from "../../content/login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../services/dialog.service";
import {NotificationService} from "../../services/notification.service";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {interval, Subscription} from "rxjs";
import {MovieDTO} from "../../interfaces/movieDTO";

@Component({
  selector: 'app-navigation-list',
  templateUrl: './navigation-list.component.html',
  styleUrls: ['./navigation-list.component.scss']
})
export class NavigationListComponent implements OnInit {

  @ViewChild('searchComp') private searchComp: SearchComponent;
  @Input() sidenav: MatSidenav;
  notificationsList: MovieDTO[] = [];
  subscription: Subscription;

  constructor(private userService: UserService, private router: Router,
              private securityService: SecurityService, private dataService: DataService,
              private notificationService: NotificationService, public dialog: MatDialog, private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.prepareNotifications();
  }

  prepareNotifications(): void {
    const source = interval(10000);
    this.subscription = source?.subscribe(val => this.getNotifications());
  }

  getNotifications(): void {
    if (this.dataService.get('notifications') != null) {
      this.notificationsList = this.dataService.get('notifications');
    }
    if (this.isLoggedIn() && this.notificationsList?.length < 10) {
      const count: number = this.notificationsList.length + 1;
      this.userService.getNotifications(count).subscribe(res => {
        if (res !== null) {
          this.proccessNotifications(res);
        }
      });
    }
  }

  proccessNotifications(res?: MovieDTO): void {
    const existMovie = this.notificationsList.some(notification => notification.id === res.id);
    if (res && !existMovie) {
      this.notificationsList.push(res);
    }
    this.dataService.set('notifications', this.notificationsList);
  }

  onToggleClose() {
    this.sidenav.close();
  }

  isLoggedIn(): boolean {
    return this.userService.isUserLoggedIn();
  }

  closeAccount(): void {
    const email: string = this.dataService.get('email');
    this.userService.closeAccount(email).subscribe(res => {
      this.logout();
      this.notificationService.showSuccess('Your account has been inactivated');
    });
  }

  logout(): void {
    this.userService.logout().subscribe(() => {
      this.securityService.setAuthorizationToken(null);
      this.dataService.removeItem('email');
      this.dataService.removeItem('notifications');
      this.dataService.removeItem('username');
      this.navigateToHomePage();
    });
  }

  navigateToHomePage(): void {
    this.router.navigate(['home-page']);
    this.searchComp.resetForm();
  }

  login(): void {
    this.dialog.open(LoginComponent, this.dialogService.getCustomCssDialog('common-dialog'))
      .afterClosed().subscribe(res => {
      if (res) {
        this.router.navigate(['home-page']);
      }
    });
  }

  openConfirmDialog() {
    this.dialog.open(ConfirmDialogComponent, this.dialogService.getCustomCssDialog('confirm-dialog', 'Are you sure you want to deactivate your account?'))
      .afterClosed().subscribe(res => {
      if (res) {
        this.closeAccount();
      }
    });
  }

}
