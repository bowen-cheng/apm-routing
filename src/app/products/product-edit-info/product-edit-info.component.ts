import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  templateUrl: './product-edit-info.component.html'
})
export class ProductEditInfoComponent implements OnInit {
  @ViewChild(NgForm) productForm: NgForm;

  protected errorMessage: string;
  protected product: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // $$ Data for product is retrieved from parent's route resolver
    this.route.parent.data.subscribe(data => {
      this.product = data['product'];
    });
  }
}
