import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  templateUrl: './product-edit-tags.component.html'
})
export class ProductEditTagsComponent implements OnInit {
  protected errorMessage: string;
  protected newTags = '';
  protected product: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // $$ Data for product is retrieved from parent's route resolver
    this.route.parent.data.subscribe(data => {
      this.product = data['product'];
    });
  }

  // Add the defined tags
  addTags(): void {
    const tagArray = this.newTags.split(',');
    this.product.tags = this.product.tags ? this.product.tags.concat(tagArray) : tagArray;
    this.newTags = '';
  }

  // Remove the tag from the array of tags.
  removeTag(idx: number): void {
    this.product.tags.splice(idx, 1);
  }
}
