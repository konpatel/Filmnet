import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../services/dialog.service";
import {LoginComponent} from "../../content/login/login.component";
import {Router} from "@angular/router";
import {SearchComponent} from "../search/search.component";
import {UserService} from "../../services/user.service";
import {SecurityService} from "../authorized-guard/security.service";
import {interval, Subscription} from "rxjs";
import {DataService} from "../../services/data.service";
import {MovieDTO} from "../../interfaces/movieDTO";
import {NotificationService} from "../../services/notification.service";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('searchComp') private searchComp: SearchComponent;
  @Output() SideNavToggle = new EventEmitter();

  subscription: Subscription;
  notificationsList: MovieDTO[] = [];
  mobileSize: boolean;

  constructor(public dialog: MatDialog, private dialogService: DialogService, private router: Router,
              private userService: UserService, private securityService: SecurityService, private dataService: DataService,
              private notificationService: NotificationService, private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.prepareNotifications();
  }

  ngAfterViewInit() {
    this.getScreenSize();
    this.cd.detectChanges();
  }

  ngOnDestroy() {
    this.subscription && this.subscription.unsubscribe();
  }

  @HostListener("window:resize")
  getScreenSize() {
    this.mobileSize = window.innerWidth < 960;
  }

  prepareNotifications(): void {
    const source = interval(10000);
    this.subscription = source?.subscribe(val => this.getNotifications());
  }


  login(): void {
    this.dialog.open(LoginComponent, this.dialogService.getCustomCssDialog('common-dialog'))
      .afterClosed().subscribe(res => {
      if (res) {
        this.router.navigate(['home-page']);
      }
    });
  }

  isLoggedIn(): boolean {
    return this.userService.isUserLoggedIn();
  }

  logout(): void {
    this.userService.logout().subscribe(() => {
      this.securityService.setAuthorizationToken(null);
      this.dataService.removeItem('email');
      this.dataService.removeItem('notifications');
      this.dataService.removeItem('username');
      this.notificationsList = [];
      this.navigateToHomePage();
    });
  }

  navigateToHomePage(): void {
    this.router.navigate(['home-page']);
    this.searchComp.resetForm();
  }

  clickLinks(): void {
    this.searchComp.resetForm();
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

  closeAccount(): void {
    const email: string = this.dataService.get('email');
    this.userService.closeAccount(email).subscribe(res => {
      this.logout();
      this.notificationService.showSuccess('Your account has been inactivated');
    });
  }

  navigateToAdminPage(): void {
    this.router.navigate(['admin-page']);
  }

  navigateToNotificationPage(): void {
    this.router.navigate(['notification-page']);
  }

  openSidenav() {
    this.SideNavToggle.emit();
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
