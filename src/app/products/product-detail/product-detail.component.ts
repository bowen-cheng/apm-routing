import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    // $$ The + sign is a JS symbol that converts strings to numbers.
    // The snapshot property provides a static set of initial route parameters which does not change as route parameters change.
    // The parameter name must exactly match the placeholder variable. Name is case sensitive.
    const productId = +this.route.snapshot.params['id'];
    this.getProduct(productId);
  }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error);
  }
}
