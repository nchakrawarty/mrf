import { Component, Inject, OnInit,EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addweight',
  templateUrl: './addweight.component.html',
  styleUrls: ['./addweight.component.scss']
})
export class AddweightComponent implements OnInit {
  @Output() modalClosed = new EventEmitter<void>();
  myForm!: FormGroup;
date= new Date();
toAdd:any =[];
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.clearForm()
    console.log(this.data, this.toAdd)
  }
  onFormSubmit(){
    console.log("hi", this.myForm)
    if (this.myForm.valid) {

      this.myForm.value['date'] = this.date;

      // Handle the form submission logic here
      console.log('Form submitted successfully!');
      console.log(this.myForm.value);
    this.toAdd.push(this.myForm.value)

    } else {
      console.log('Form is invalid. Please check the inputs.');
    }
    this.clearForm()
  }
  clearForm() {
    this.myForm = this.formBuilder.group({
      bagNum: ['', Validators.required],
      weight: ['', Validators.required],
      date: ['',Validators.nullValidator]
      // Add more form controls here if needed
    });
  }
  remove(_v: any,i: any){
    this.toAdd.splice(i,1)
    console.log(this.toAdd)
  }
  save(t:any){
    console.log(t,this.data,this.data.bagdetails)
    if(this.data.bagdetails==undefined)
    {
      console.log(this.data.bagdetails)
      this.data['bagdetails'] =t
      this.http.patch(`${Urls.BAGS}/${this.data.id}`,this.data).subscribe((res=>{
        console.log(res)
window.location.reload()

      }))
    }
    else {
      console.log(this.data, this.data.bagdetails)
      this.data.bagdetails = this.data.bagdetails.concat(t);
      this.http.patch(`${Urls.BAGS}/${this.data.id}`,{'bagdetails': this.data.bagdetails}).subscribe((res=>{
        console.log(res)
window.location.reload()

      }))
    }

  }
}
