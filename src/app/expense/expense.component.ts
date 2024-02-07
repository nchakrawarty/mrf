import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit {
  formData: any = {};
  form: FormGroup | undefined;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

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
