import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserTokenDTO} from "../../interfaces/userTokenDTO";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  hide1 = true;
  hide2 = true;

  resetPasswordForm: FormGroup = this.formBuilder.group({
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
    token: ['']
  });

  constructor(private formBuilder: FormBuilder, private userService: UserService, private notificationService: NotificationService,
              private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getUrlParameters();
  }

  getUrlParameters(): void {
    this.route.paramMap.subscribe(params => {
      this.token = params.get('token');
    });
  }

  resetPassword(): void {
    const userToken: UserTokenDTO = this.resetPasswordForm.value;
    userToken.token = this.token;
    userToken.token = this.token;
    userToken.password.trim();
    if (userToken.confirmPassword) {
      if (userToken.password !== userToken.confirmPassword) {
        this.notificationService.showError('Confirm password must match password');
        return;
      }
    }
    this.saveNewPassword(userToken);
  }

  saveNewPassword(userToken: UserTokenDTO): void {
    this.userService.saveNewPassword(userToken).subscribe(res => {
      this.notificationService.showSuccess('Password changed successfully');
      this.router.navigate(['home-page']);
    });
  }

}
