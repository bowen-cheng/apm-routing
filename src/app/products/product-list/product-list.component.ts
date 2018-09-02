import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  pageTitle = 'Product List';
  imageWidth = 50;
  imageMargin = 2;
  showImage = true;
  listFilter: string;
  errorMessage: string;

  products: Product[];

  constructor(private productService: ProductService,
              private route: ActivatedRoute) { }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(
      products => this.products = products,
      error => this.errorMessage = <any>error
    );

    // $$: Read the query parameters if exists
    if (!!this.route.snapshot.queryParamMap.get('filterBy')) {
      this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';
    }
    if (!!this.route.snapshot.queryParams['showImage']) {
      this.showImage = this.route.snapshot.queryParams['showImage'] === 'true';
    }
  }
}
