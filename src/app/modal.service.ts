import { Injectable } from '@angular/core';
import { MatDialog,MatDialogRef } from '@angular/material/dialog';
import { AddweightComponent } from './addweight/addweight.component';
import { AddwasteComponent } from './addwaste/addwaste.component';
import { AddBagComponent } from './add-bag/add-bag.component';
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private dialog: MatDialog) { }
  openModal(d: any): void{
    console.log(d)
   this.dialog.open(AddweightComponent, {
    width: '800px',
    data: d
  });
  }

  openModalH(): MatDialogRef<AddwasteComponent> {
    console.log()
   return this.dialog.open(AddwasteComponent, {
      width: '800px',
      height: '100vh',
      data: 'nodata'
    });
  }
  openModalB(): void{
    this.dialog.open(AddBagComponent, {
      width: '800px',
      height: '100vh',
      data: 'nodata'
    });
  }
}
