import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  result=""
  constructor(private fb: FormBuilder) {
    this.createForm();

  }

  ngOnInit(): void {
  }

  createForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required,Validators.pattern('[a-zA-Z]*$')]],
      id: ['', [Validators.required,Validators.pattern('[a-z][0-2][0-9]')]],
      dp: ['', [Validators.required, Validators.min(1)]],
      op: ['', [Validators.required , Validators.min(1)]],
      discount: ['', [Validators.required,Validators.pattern('[0-1]')]]
    });
  }

  submit()
  {
    var dp=this.productForm.controls["dp"].value
    var op=this.productForm.controls["op"].value
    var discount=Number(this.productForm.controls["discount"].value)
    var expectedDiscount=0;

    if(op<dp)
    {
      expectedDiscount=1
    }

    if(discount == expectedDiscount)
    {
      this.result="Product Saved"
    }
    else
    {
      this.result="Product not saved as isDiscounted is wrong."
    }
  }


}
