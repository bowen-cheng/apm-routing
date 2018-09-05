import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditComponent } from './product-edit/product-edit.component';

import { ProductFilterPipe } from './product-filter.pipe';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductResolverService } from './product-resolver.service';
import { ProductService } from './product.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      // $$ The 'path' property does not need a leading slash but routerLink directive does: <a routerLink='/products'></a>
      { path: 'products', component: ProductListComponent },
      {
        // $$ The colon (:) symbol identifies a place holder variable, there can be as many as needed as long as they have unique names
        path: 'products/:id', component: ProductDetailComponent,
        // $$ The list of resolvers is key-value pairs, where the key is a logical name, the value is a reference to the resolver service
        // $$ The key, "product", is used for retrieving data later in the component class
        resolve: { product: ProductResolverService }
      },
      {
        path: 'products/:id/edit', component: ProductEditComponent,
        resolve: { product: ProductResolverService }
      }
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
