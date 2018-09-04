import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { Product } from './product';
import { ProductModule } from './product.module';
import { ProductService } from './product.service';

@Injectable({
  providedIn: ProductModule
})
export class ProductResolverService implements Resolve<Product> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = +route.params['id'];
    return this.productService.getProduct(id);
  }

}
