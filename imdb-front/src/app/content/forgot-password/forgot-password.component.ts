import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {LoginComponent} from "../login/login.component";
import {FormBuilder, FormGroup} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {UserEmailDTO} from "../../interfaces/userEmailDTO";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup = this.formBuilder.group({
    email: ['']
  });

  constructor(public dialogRef: MatDialogRef<LoginComponent>, private formBuilder: FormBuilder,
              private userService: UserService, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close(false);
  }

  send(): void {
    const userEmailDTO: UserEmailDTO = this.forgotPasswordForm.value;
    userEmailDTO.email.trim();
    this.userService.sendEmail(userEmailDTO).subscribe(res => {
      this.notificationService.showSuccess('An email sent successfully to ' + userEmailDTO.email);
      this.dialogRef.close(true);
    });
  }

}
