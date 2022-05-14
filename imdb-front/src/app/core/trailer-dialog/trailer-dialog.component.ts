import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-trailer-dialog',
  templateUrl: './trailer-dialog.component.html',
  styleUrls: ['./trailer-dialog.component.scss']
})
export class TrailerDialogComponent implements OnInit {

  youtubeId: string;

  constructor(public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public data: string) {
    this.youtubeId = data;
  }

  ngOnInit(): void {
  }

  createURL(): string {
    return 'https://www.youtube.com/embed/' + this.youtubeId + '?autoplay=1&origin=http%3A%2F%2Fwww.themoviedb.org&hl=en&modestbranding=1&fs=1&autohide=1';
  }

  close() {
    this.dialogRef.close(false);
  }


}
