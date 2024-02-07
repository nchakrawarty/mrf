import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrls: ['./sale.component.scss']
})
export class SaleComponent implements OnInit {
  formData: any = {};
  form: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

  }
  onSubmit() {
    // Handle form submission logic here
    console.log(this.formData);
  }

  onFileChange(event: any) {
    // Handle file change logic here
    console.log(event.target.files);
  }

}
