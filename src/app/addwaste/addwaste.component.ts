import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addwaste',
  templateUrl: './addwaste.component.html',
  styleUrls: ['./addwaste.component.scss']
})
export class AddwasteComponent implements OnInit {
  @Output() modalClosed = new EventEmitter<void>();

  myForm!: FormGroup;
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private formBuilder: FormBuilder,private dialogRef: MatDialogRef<AddwasteComponent>) { }
  wList: any;
  name: any;
  toaddArray: any = [];
  total: any;
  agg:any =[];
  closeModalAndRefresh() {
    this.dialogRef.close();
    this.modalClosed.emit();
  }

  ngOnInit(): void {
    this.http.get(`${Urls.AGGR}`).subscribe((res=>{
      this.agg=res;
      console.log(this.agg)
    }))
    this.clearForm()
    console.log(this.data)
    this.http.get(`${Urls.WLIST}`).subscribe((res => {
      console.log(res)
      this.wList = res;
    }))
    this.myForm.addControl('date', String);
  }
  clearForm() {
    this.myForm = this.formBuilder.group({
      amount: ['', Validators.required],
      name: ['', Validators.required],
      date: ['',Validators.nullValidator]
      // Add more form controls here if needed
    });
    this.totalAmount()
  }
  onSelectChange() {
    console.log('Hi')
  }
  date= new Date()
  onFormSubmit() {
    if (this.myForm.valid) {
      // this.http.get(`${Urls.AGGR}`).subscribe((res=>{
      //   this.agg =res;
      //   console.log(this.agg)
      // }))
      this.myForm.value['date'] = this.date;
      this.toaddArray.push(this.myForm.value);
      this.totalAmount()
      // Handle the form submission logic here
      console.log('Form submitted successfully!');
      console.log(this.myForm.value);
      console.log(this.toaddArray);
    } else {
      console.log('Form is invalid. Please check the inputs.');
    }
    this.clearForm()
  }
  totalAmount() {
    this.total = 0;
    this.toaddArray.forEach((element: { amount: any; }) => {
      this.total = this.total + element.amount;
    });
  }
  // reverse() {
  //   this.toaddArray = this.toaddArray.slice().reverse()
  // }
  remove(_a: any, i: any) {
    this.toaddArray.splice(i, 1)
    console.log(this.toaddArray, _a,i)
    this.totalAmount()
  }
  oldEle: any
  oldElement: any
 async save(d: any) {
var temp =0;
    const newEle = this.toaddArray.filter(({ name: id1 }: { name: string }) => !this.agg.some(({ name: id2 }: { name: string }) => id2 === id1));
    console.log("New element", newEle);
    if (newEle) {
      this.oldEle = this.toaddArray.filter(({ name: id1 }: { name: string }) => !newEle.some(({ name: id2 }: { name: string }) => id2 === id1));
      console.log("Old element", this.oldEle);
    }
    console.log(d)
    this.http.post(`${Urls.WCOLL}`,this.toaddArray).subscribe((res=>{
      console.log(res)
      if (newEle.length >= 1) {
        console.log(newEle.length);
        newEle.forEach((item: { name: any; }) => {
          console.log(item.name)
        })
        newEle.forEach((item: { name: any; type: any; amount: any; kannadaName: any; }) => {
          console.log("new", newEle)
          this.http.post(`${Urls.AGGR}`, {
            "name": item.name,
            "type": item.type,
            "totalAmount": item.amount,
            "availableAmount": item.amount,
            "kannadaName": item.kannadaName
          }).subscribe(res => {
            console.log("post", res);
      // window.location.reload()
      temp =temp+1;
      console.log(temp,d.length)
      if(temp == d.length){
        this.callreload(temp);

      }
          })
        })
      }
      if (this.oldEle.length >= 1) {
        console.log("check")
        console.log(this.oldEle.length);
        this.oldEle.forEach((item: { name: any; }) => {
          console.log(item.name)
        })
        this.oldEle.forEach((item: { name: any; amount: any; }) => {
          // this.http.get(`${Urls.AGGREGATED}?filter[where][name]=${item.name}`).subscribe(res=>{
          this.http.get(`${Urls.AGGR}?filter[where][name]=${item.name}`).subscribe(res => {
            this.oldElement = res
            console.log(this.oldElement);
            var totalAmount = 0;
            totalAmount = this.oldElement[0].totalAmount + item.amount;
            var availableAmount = 0;
            availableAmount = this.oldElement[0].availableAmount + item.amount;
            console.log(totalAmount);
            console.log(availableAmount);
            this.http.patch(`${Urls.AGGR}/${this.oldElement[0].id}`, {
              "totalAmount": totalAmount,
              "availableAmount": availableAmount
            }).subscribe(res => {
              console.log("patch", res)
      // window.location.reload()
temp=temp+1;
console.log(temp,d.length)
if(temp == d.length){
  this.callreload(temp);

}
            })
          })

        })
      }
    }))

  }
  callreload(t: number){
console.log("reload",t)
window.location.reload()
  }
}
