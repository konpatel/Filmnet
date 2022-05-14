import {Component, Input, OnInit} from '@angular/core';
import {SecurityService} from "../security.service";

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent implements OnInit {

  authorized: boolean;
  rolesArray: string[];
  privilegesArray: string[];

  constructor(private securityService: SecurityService) {
    this.securityService.registerComponent(this);
  }

  @Input()
  set roles(roles: string) {
    if (roles) {
      this.rolesArray = roles.split(',');
    }
  }

  ngOnInit(): void {
    this.isAuthorized();
  }

  isAuthorized(): void {
    this.authorized = this.securityService.isAuthenticated() &&
      (this.securityService.hasGroups(this.rolesArray));
  }

}
