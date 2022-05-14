import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UserDetailsDTO} from "../../interfaces/utils/UserDetailsDTO";
import {map} from "rxjs/operators";
import {SecurityService} from "../authorized-guard/security.service";

@Injectable()
export class JwtResponseInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService) {
  }

  /**
   * This interceptor checks on HttpResponse request the AUTH-TOKEN / X-LOGIN-SUCCESS / X-LOGOUT-SUCCESS headers.
   */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(map(event => {
      if (event instanceof HttpResponse) {
        const response: HttpResponse<any> = event as HttpResponse<any>;
        const authHeader: string = response.headers.get(this.securityService.getTokenName);
        if (authHeader) {
          this.securityService.setAuthorizationToken(authHeader);
        }
        const loginSuccessHeader: string = response.headers.get('X-LOGIN-SUCCESS');
        if (loginSuccessHeader) {
          const loginResponse: HttpResponse<UserDetailsDTO> = response;
          const userDetails: UserDetailsDTO = loginResponse.body;
          this.securityService.setUserDetails(userDetails);
        }
        const logoutSuccessHeader: string = response.headers.get('X-LOGOUT-SUCCESS');
        if (logoutSuccessHeader) {
          this.securityService.clearSessionStorage();
        }
      }
      return event;
    }));
  }

}
