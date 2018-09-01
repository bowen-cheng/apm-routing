import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductService } from './product.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      // $$ The 'path' property does not need a leading slash but routerLink directive does: <a routerLink='/products'></a>
      { path: 'products', component: ProductListComponent },
      // $$ The colon (:) symbol identifies a place holder variable, there can be as many as needed as long as they have unique names
      { path: 'products/:id', component: ProductDetailComponent },
      { path: 'products/:id/edit', component: ProductEditComponent }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductFilterPipe
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule {}
