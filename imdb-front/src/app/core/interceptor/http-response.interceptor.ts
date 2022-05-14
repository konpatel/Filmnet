import {Injectable, Injector} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from "rxjs/operators";
import {SpinnerService} from "../../services/spinner.service";
import {ErrorDTO} from "../../interfaces/validation/errorDTO";
import {NotificationService} from "../../services/notification.service";

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService, public inj: Injector, public notificationService: NotificationService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('notifications')) {
      this.spinnerService.requestStarted();
    }
    return this.handler(next, request);
  }

  handler(next: any, request: any) {
    return next.handle(request).pipe(tap((event: any) => {
        if (event instanceof HttpResponse) {
          this.spinnerService.requestEnded();
        }
      },
      (error: HttpErrorResponse) => {
        this.spinnerService.requestEnded();
        const errorValidationHeader: string = error?.headers?.get("X-VALIDATION-ERROR");
        if (errorValidationHeader) {
          const errorDTO: ErrorDTO = error.error;
          const errorDTOList: string[] = [];
          errorDTO.validationDTOs.forEach((v, i) => {
            errorDTOList.push(v.errorValidation);
          });
          errorDTOList.forEach(er => {
            if (er.startsWith('Password must be')) {
              let newError = er.replace(/\./g, ' ');
              this.showError(newError);
            } else {
              this.showError(er);
            }
          });
        } else {
          if (error.error) {
            this.showError(error.error.message);
            throw error;
          }
        }
      }));
  }

  showError(error: string) {
    this.notificationService.showError(error);
  }

}
