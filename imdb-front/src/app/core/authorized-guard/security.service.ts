import {Inject, Injectable} from '@angular/core';
import {SecurityComponent} from "./security/security.component";
import {ModuleConfig} from "./security/security.module";
import {JwtHelperService} from "@auth0/angular-jwt";
import {UserDetailsDTO} from "../../interfaces/utils/UserDetailsDTO";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  registeredComponents: SecurityComponent[] = [];
  authToken: string;

  constructor(@Inject('configSecurity') private config: ModuleConfig, private jwtHelperService: JwtHelperService) {
  }

  get authorizationToken(): string {
    if (!this.authToken && this.config.storageType === 'sessionStorage') {
      this.authToken = sessionStorage.getItem(this.config.jwtTokenName);
    }
    return this.authToken;
  }

  get getTokenName(): string {
    return this.config.jwtTokenName;
  }

  get getUserDetailsName(): string {
    return this.config.userDetailsName;
  }

  registerComponent(component: SecurityComponent): void {
    this.registeredComponents.push(component);
  }

  setUserDetails(user: UserDetailsDTO): void {
    if (user && this.config.storageType === 'sessionStorage') {
      sessionStorage.setItem(this.config.userDetailsName, JSON.stringify(user));
      this.registeredComponents.forEach(component => component.isAuthorized());
    }
  }

  clearSessionStorage(): void {
    if (this.config.storageType === 'sessionStorage') {
      sessionStorage.clear();
    }
  }

  setAuthorizationToken(token: string): void {
    this.authToken = token;
    if (token && this.config.storageType === 'sessionStorage') {
      sessionStorage.setItem(this.config.jwtTokenName, this.authToken);
    }
  }


  getUserDetails(): UserDetailsDTO {
    const json: string = (this.config.storageType === 'sessionStorage') ? sessionStorage.getItem(this.config.userDetailsName) : localStorage.getItem(this.config.userDetailsName);
    return (json) ? JSON.parse(json) as UserDetailsDTO : null;
  }

  isAuthenticated(): boolean {
    if (!this.authorizationToken) {
      return false;
    }
    return !this.jwtHelperService.isTokenExpired(this.authToken);
  }

  hasGroups(roleNames: string[]): boolean {
    const user: UserDetailsDTO = this.getUserDetails();
    return user.roles.some(role => roleNames.includes(role));
  }

}
