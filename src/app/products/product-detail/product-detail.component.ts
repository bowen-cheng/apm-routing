import { Component } from '@angular/core';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent {
  pageTitle: string = 'Product Detail';
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService) { }

  getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error);
  }
}
