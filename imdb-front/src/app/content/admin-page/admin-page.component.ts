import {Component, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {AuthUserDTO} from "../../interfaces/authUserDTO";
import {MatTableDataSource} from "@angular/material/table";
import {NotificationService} from "../../services/notification.service";
import {ConfirmDialogComponent} from "../../core/confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  inactivateUsers: AuthUserDTO[] = [];
  displayedColumns: string[] = ['email', 'action'];
  dataSource = new MatTableDataSource<AuthUserDTO>();

  constructor(private userService: UserService, private notificationService: NotificationService,
              public dialog: MatDialog, private dialogService: DialogService) {
  }

  ngOnInit(): void {
    this.getAllInactiveUsers();
  }

  delete(row: AuthUserDTO) {
    this.userService.deleteUser(row.username).subscribe(res => {
      this.notificationService.showSuccess('User has been deleted successfully');
      this.getAllInactiveUsers();
    });
  }

  getAllInactiveUsers() {
    this.userService.getAllInactiveUsers().subscribe(res => {
      this.dataSource.data = res;
    });
  }

  openConfirmDialog(row: AuthUserDTO) {
    this.dialog.open(ConfirmDialogComponent, this.dialogService.getCustomCssDialog('confirm-dialog', 'Are you sure you want to delete user ' +row.username + '?'))
      .afterClosed().subscribe(res => {
      if (res) {
        this.delete(row);
      }
    });
  }

}
