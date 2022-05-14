import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToolBarComponent} from "../../core/tool-bar/tool-bar.component";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {UserDTO} from "../../interfaces/userDTO";
import {DataService} from "../../services/data.service";
import {DialogService} from "../../services/dialog.service";
import {ForgotPasswordComponent} from "../forgot-password/forgot-password.component";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;

  loginForm: FormGroup = this.formBuilder.group({
    email: [''],
    password: ['']
  });

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ToolBarComponent>,
              private router: Router, private userService: UserService, private notificationService: NotificationService,
              private dataService: DataService, public dialog: MatDialog, private dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  login() {
    const user: UserDTO = this.loginForm.value;
    user.email.trim();
    user.password.trim();
    this.userService.loginUser(user).subscribe(res => {
      this.notificationService.showSuccess('Login successfully');
      this.dataService.set('email', user.email);
      this.dialogRef.close(true);
      this.userService.getUsername(this.dataService.get('email')).subscribe(user => {
        this.dataService.set('username', user.username);
      });
    });
  }

  navigateToRegisterPage(): void {
    this.router.navigate(['register-page']);
    this.close();
  }

  close() {
    this.dialogRef.close(false);
  }

  openForgotPasswordDialog() {
    this.dialog.open(ForgotPasswordComponent, this.dialogService.getCustomCssDialog('common-dialog'))
      .afterClosed().subscribe(res => {
      if (res) {
        this.close();
      }
    });
  }

}
