import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ProductEditComponent } from './product-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ProductEditGuard implements CanDeactivate<ProductEditComponent> {

  canDeactivate(component: ProductEditComponent): boolean {
    if (component.isDirty()) {
      const productName = component.product.productName || 'New Product';
      return confirm(`Are you sure to lose all unsaved changes to ${productName}?`);
    }
    return true;
  }
}
