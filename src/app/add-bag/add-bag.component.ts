import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-add-bag',
  templateUrl: './add-bag.component.html',
  styleUrls: ['./add-bag.component.scss']
})
export class AddBagComponent implements OnInit {
  myForm!: FormGroup;
  panchList:any;
  picker!: MatDatepicker<Date>;
  today =new Date();
  panchayatName:string | undefined;
  code:string | undefined;
  panchayatId:string |undefined;
  option= {
    panchayatName: "",
    code: "Select panchayat"
  } ;
  constructor(public dialogRef: MatDialogRef<AddBagComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private formBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.option.code="Select panchayat"
    this.clearForm();
    this.http.get(`${Urls.PANCH}`).subscribe((res=>{
      this.panchList=res;
      console.log(this.panchList)
    }))
  }
  clearForm(){
    this.myForm = this.formBuilder.group({
      panchayatName: ['',Validators.required],
time: [this.today,Validators.required],
      bagNumber: ['', Validators.required]

    })
  }
  onFormSubmit(){
    this.panchayatName = this.myForm.value.panchayatName.name;
    this.code = this.myForm.value.panchayatName.code;
    this.panchayatId = this.myForm.value.panchayatName.id;
    console.log(this.myForm.value, this.panchayatName, this.panchayatId, this.code, this.myForm.value.bagNumber)
    this.http.post(`${Urls.BAGS}`,{"time":this.myForm.value.time, "panchayatName": this.panchayatName, "panchayatId":this.panchayatId, "bagNumber":this.myForm.value.bagNumber,"code":this.code, "weightAtPanchayat":0,"weightAtMRF":0}).subscribe((res=>{
      console.log(res)
      this.clearForm()
      this.dialogRef.close();
      window.location.reload()
    }))
  }
  onSelectChange(p:any){
this.option =p;
    console.log("Panchayat selected", this.option,this.myForm)
  }
  closeDialogWithData(): void {
    // this.dialogRef.close({ resultData: 'Some data to return' });
  }

}
