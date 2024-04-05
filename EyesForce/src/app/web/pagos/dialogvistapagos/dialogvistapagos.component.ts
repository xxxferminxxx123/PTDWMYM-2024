import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-dialogvistapagos',
  templateUrl: './dialogvistapagos.component.html',
  styleUrls: ['./dialogvistapagos.component.css']
})
export class DialogvistapagosComponent implements OnInit {

  monto: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  


}
