import {Injectable} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) {
  }

  getCustomCssDialog(panelClass: string, data?: any): MatDialogConfig {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.panelClass = panelClass;
    dialogConfig.disableClose = true;
    dialogConfig.hasBackdrop = true;
    dialogConfig.closeOnNavigation = true;
    dialogConfig.autoFocus = false;
    dialogConfig.role = 'dialog';
    dialogConfig.data = data;
    return dialogConfig;
  }

}
