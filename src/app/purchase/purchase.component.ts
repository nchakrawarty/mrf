import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit {
  form!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      purchaseFor: ['', Validators.required],
      vendor: ['', Validators.required],
      vendorInvoice: [''],
      product: ['', Validators.required],
      ratePerKg: ['', Validators.required],
      reductionQuantityPercent: ['', Validators.required],
      quantityAfterReduction: ['', Validators.required],
      reductionQuantity: ['', Validators.required],
      uploadWeightmentSlip: ['', Validators.required],
      vehicleNumber: ['', Validators.required],
      transportVendor: ['', Validators.required],
      additionalTransportationCost: ['', Validators.required],
      totalTransportationCost: ['', Validators.required],
      totalReceivedQuantity: ['', Validators.required],
      totalPurchaseAmount: ['', Validators.required],
      tax: ['', Validators.required],
      totalAmount: ['', Validators.required]
    });
  }

  onSubmit(): void {
    // Handle form submission
    console.log(this.form);
  }
}
