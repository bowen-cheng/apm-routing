import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Product } from './product';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

  constructor(private productService: ProductService,
              private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const id = route.params['id'];
    if (isNaN(id)) {
      return this.errorHandler(`Product ID is not a number: ${id}`);
    }
    return this.productService.getProduct(+id).pipe(
      map(product => {
        return !!product ? product : this.errorHandler(`No product found by ID: ${id}`);
      }),
      catchError(err => {
        return this.errorHandler(`Error retrieving product with ID: ${err}`);
      })
    );
  }

  errorHandler(message: string) {
    console.error(message);
    this.router.navigate(['/products']);
    return of(null);
  }
}
