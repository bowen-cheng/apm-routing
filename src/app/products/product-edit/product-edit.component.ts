import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { MessageService } from '../../messages/message.service';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  protected pageTitle = 'Product Edit';
  protected errorMessage: string;

  protected product: Product;

  private dataIsValid: { [key: string]: boolean };

  constructor(private productService: ProductService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    // $$: We subscribe to the params observable because product ID will change if user clicks "Add Product" link when editing a product
    // The anonymous function passed to subscribe() will be executed everytime any of the route parameters change
    // this.route.params.subscribe((params) => {
    //     const productId = +params['id'];
    //     this.getProduct(productId);
    //   });

    // $$: Retrieve the product directly from the ProductResolverService
    // The key "product" must match the route resolver's key definition when the resolver service is setup in router module
    // This is the observable approach, see ProductDetailsComponent for the snapshot approach
    this.route.data.subscribe(data => this.onProductRetrieved(data['product']));
  }

  // getProduct(id: number): void {
  //   this.productService.getProduct(id)
  //     .subscribe(
  //       (product: Product) => this.onProductRetrieved(product),
  //       (error: any) => this.errorMessage = <any>error
  //     );
  // }

  onProductRetrieved(product: Product): void {
    this.product = product;

    if (this.product.id === 0) {
      this.pageTitle = 'Add Product';
    } else {
      this.pageTitle = `Edit Product: ${this.product.productName}`;
    }
  }

  deleteProduct(): void {
    if (this.product.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the product: ${this.product.productName}?`)) {
        this.productService.deleteProduct(this.product.id)
          .subscribe(
            () => this.onSaveComplete(`${this.product.productName} was deleted`),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }

  saveProduct(): void {
    if (this.isValid(null)) {
      this.productService.saveProduct(this.product)
        .subscribe(
          () => this.onSaveComplete(`${this.product.productName} was saved`),
          (error: any) => this.errorMessage = <any>error
        );
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(message?: string): void {
    if (message) {
      this.messageService.addMessage(message);
    }

    // Navigate back to the product list
    this.router.navigateByUrl('products');
  }

  isValid(path: 'info' | 'tags' | null): boolean {
    this.validate();
    if (!!path) {
      return this.dataIsValid[path];
    } else {
      return !!this.dataIsValid && this.dataIsValid['info'] && this.dataIsValid['tags'];
    }
  }

  validate(): void {
    this.dataIsValid = {};

    // "info" tab
    this.dataIsValid['info'] = !!(this.product.productName && this.product.productName.length >= 3 && this.product.productCode);
    // "tags" tab
    this.dataIsValid['tags'] = !!(this.product.category && this.product.category.length >= 3);
  }
}
