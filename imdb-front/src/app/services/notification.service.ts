import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private toastr: ToastrService) {
  }

  showSuccess(message: string) {
    this.toastr.success(message, 'Success', {
      timeOut: 3000
    });
  }

  showError(message: string) {
    this.toastr.error(message, 'Error', {
      timeOut: 3000
    });
  }

}
