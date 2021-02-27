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
    //form validations here
    this.productForm = this.fb.group({

    });
  }

  submit()
  {
    //add discount verification code here 
  }


}
