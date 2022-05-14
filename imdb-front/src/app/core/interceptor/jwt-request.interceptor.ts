import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SecurityService} from "../authorized-guard/security.service";

@Injectable()
export class JwtRequestInterceptor implements HttpInterceptor {

  constructor(private securityService: SecurityService) {
  }

  /**
   * This interceptor sets JWT TOKEN header (if user is logged in) every time that client makes an Http request.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authHeader: string = this.securityService.authorizationToken;
    if (authHeader) {
      const modifiedHeaders = req.clone({
        setHeaders: {[this.securityService.getTokenName]: this.securityService.authorizationToken}
      });

      return next.handle(modifiedHeaders);
    }
    return next.handle(req);
  }

}
