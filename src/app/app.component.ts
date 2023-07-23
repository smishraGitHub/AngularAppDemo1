import { Component } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularAppDemo1';

  constructor(private dialog: MatDialog) {

  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width : '30%',
      data: {
        animal: 'panda',
      },
    });
  }
}
