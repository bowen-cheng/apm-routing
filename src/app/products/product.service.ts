import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Product } from './product';

@Injectable()
export class ProductService {
  private baseUrl = 'api/products';
  private options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(private http: HttpClient) { }

  static extractData(response: Product[]): Product[] {
    return response || [];
  }

  static handleError(error: HttpErrorResponse): Observable<any> {
    console.error(error);
    return throwError(JSON.stringify(error) || 'Server error');
  }

  static initializeProduct(): Product {
    // Return an initialized object
    return {
      id: 0,
      productName: null,
      productCode: null,
      category: null,
      tags: [],
      releaseDate: null,
      price: null,
      description: null,
      starRating: null,
      imageUrl: null
    };
  }

  getProducts(): Observable<Product[]> {
    return this.http.get(this.baseUrl).pipe(
      map(ProductService.extractData),
      tap(data => console.log('getProducts: ' + JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }

  getProduct(id: number): Observable<Product> {
    if (id === 0) {
      return of(ProductService.initializeProduct());
    }

    const url = `${this.baseUrl}/${id}`;
    return this.http.get(url).pipe(
      map(ProductService.extractData),
      tap(data => console.log('getProduct: ' + JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }

  deleteProduct(id: number): Observable<Response> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url, this.options).pipe(
      tap(data => console.log('deleteProduct: ' + JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }

  saveProduct(product: Product): Observable<Product> {
    if (product.id === 0) {
      return this.createProduct(product, this.options);
    }
    return this.updateProduct(product, this.options);
  }

  private createProduct(product: Product, options): Observable<Product> {
    product.id = undefined;
    return this.http.post(this.baseUrl, product, options).pipe(
      map(ProductService.extractData),
      tap(data => console.log('createProduct: ' + JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }

  private updateProduct(product: Product, options): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put(url, product, options).pipe(
      map(() => product),
      tap(data => console.log('updateProduct: ' + JSON.stringify(data))),
      catchError(ProductService.handleError)
    );
  }
}
