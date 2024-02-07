import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Urls } from '../constants/urls';


@Component({
  selector: 'app-daily-production',
  templateUrl: './daily-production.component.html',
  styleUrls: ['./daily-production.component.scss']
})
export class DailyProductionComponent implements OnInit {
wasteList:any;
material:any;
  // formData: any = {};
  // form: FormGroup | undefined;
  myFormw!: FormGroup;
  date:any;
  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.date =new Date()
    this.clearForm()
    this.http.get(`${Urls.WLIST}`).subscribe((res=>{
      console.log(res)
      this.wasteList =res;
    }))
    this.http.get(`${Urls.BALE}`).subscribe((res=>{
      console.log(res)
    }))
    this.myFormw.addControl('date', String);
  }
  clearForm() {
    this.myFormw = this.formBuilder.group({
      material: ['', Validators.required],
      responsible: ['', Validators.required],
      quantity: ['', Validators.required],
      bales: ['', Validators.required],
      date: ['',Validators.nullValidator],
      equipment: ['', Validators.nullValidator]
      // Add more form controls here if needed
    });
  }
  onSubmit() {
    this.myFormw.value['equipment'] = 'BALER';
    // Handle form submission logic here
    console.log(this.myFormw.value);
    var x = this.myFormw.value
    // var x = {
    //   "date": this.formData.date,
    //   "equipment": this.formData.equipment,
    //   "responsible": this.formData.responsible,
    //   "hours": this.formData.hours,
    //   "material": this.formData.material,
    //   "quantity": this.formData.quantity,
    //   "bales": this.formData.bales
    // }
    this.http.post(`${Urls.BALE}`,x).subscribe((res=>{
      console.log(res)
    }))

    const textPayload = JSON.stringify(x);

    this.http.post(`${Urls.SendEmail}`, { from: 'nripen@baeru.in', to: 'nchakrawarty@gmail.com', subject: 'Daily production from MRF', text: textPayload }).subscribe((res => {
      console.log(res)
      this.http.post(`${Urls.Emailsave}`, { from: 'nripen@baeru.in', to: 'nchakrawarty@gmail.com', subject: 'Daily production from MRF', text: JSON.stringify(res+textPayload) }).subscribe((res => {
        console.log('saved', res)
        alert("Data saved and Mail sent")
        window.location.reload()
      }))
    }))
    this.clearForm()
  }
  onSelectChange() {
    console.log('Hi')
  }
}
