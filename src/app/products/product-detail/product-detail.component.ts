import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-detail.component.html'
})
export class ProductDetailComponent implements OnInit {
  pageTitle = 'Product Detail';
  // $$ This field must be named as "product" to match the definition of the resolver service
  product: Product;
  errorMessage: string;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    // $$ The + sign is a JS symbol that converts strings to numbers.
    // The snapshot property provides a static set of initial route parameters which does not change as route parameters change.
    // The parameter name must exactly match the placeholder variable. Name is case sensitive.
    /*
    const productId = +this.route.snapshot.params['id'];
    this.getProduct(productId);
    */

    // $$ Directly retrieve the product from ProductResolverService
    // The key "product" must match the route resolver's key definition when the resolver service is setup in router module
    // This is the snapshot approach, see ProductEditComponent for the observable approach
    this.product = this.route.snapshot.data['product'];
  }

  /*
   getProduct(id: number) {
    this.productService.getProduct(id).subscribe(
      product => this.product = product,
      error => this.errorMessage = <any>error);
  }
   */
}
