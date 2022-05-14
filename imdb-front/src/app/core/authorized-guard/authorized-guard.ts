import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import {SecurityService} from "./security.service";

@Injectable({
  providedIn: 'root'
})
export class AuthorizedGuard implements CanActivate {
  constructor(private securityService: SecurityService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const roles = route.data.roles;

    if (!this.securityService.isAuthenticated()) {
      this.router.navigate([route.data.unauthorizedRedirect]);
      return false;
    }

    if (this.securityService.hasGroups(roles)) {
      return true;
    } else {
      if (route.data.forbiddenRedirect) {
        this.router.navigate([route.data.forbiddenRedirect]);
      }
    }
    return false;
  }
}
