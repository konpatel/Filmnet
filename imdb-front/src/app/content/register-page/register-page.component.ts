import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDTO} from "../../interfaces/userDTO";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";
import {TermsDialogComponent} from "../../core/terms-dialog/terms-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  isChecked: boolean;
  hide1 = true;
  hide2 = true;

  registerForm: FormGroup = this.formBuilder.group({
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private notificationService: NotificationService,
              private router: Router, public dialog: MatDialog, private dialogService: DialogService) {
  }

  ngOnInit(): void {
  }

  saveUser() {
    const user: UserDTO = this.registerForm.value;
    user.email.trim();
    user.username.trim();
    user.firstname.trim();
    user.lastname.trim();
    user.password.trim();
    user.confirmPassword.trim();
    if (this.isChecked) {
      if (user.confirmPassword) {
        if (user.password !== user.confirmPassword) {
          this.notificationService.showError('Confirm password must match password');
          return;
        }
      }
      this.userService.registerUser(user).subscribe(res => {
        this.notificationService.showSuccess('Success register');
        this.router.navigate(['home-page']);
      });
    } else {
      this.notificationService.showError('You must accept the terms');
    }
  }

  getTerms(e: any): void {
    this.isChecked = e.checked;
  }

  openTermsDialog() {
    this.dialog.open(TermsDialogComponent, this.dialogService.getCustomCssDialog('terms-dialog'))
      .afterClosed().subscribe(res => {
      // Do nothing
    });
  }

}
