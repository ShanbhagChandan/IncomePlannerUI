import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.css']
})
export class DeletedialogComponent {

  constructor(private dialogRef: MatDialogRef<DeletedialogComponent>){

  }

  cancel(){
    this.dialogRef.close(false);
  }

  confirm(){
    this.dialogRef.close(true);
  }
}
