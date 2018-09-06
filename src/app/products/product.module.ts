import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditInfoComponent } from './product-edit-info/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags/product-edit-tags.component';
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
      // Route paths with a leading slash are absolute path. E.g. starting from the root URL
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
        resolve: { product: ProductResolverService },
        // $$ The children array is used for defining child routes
        // All paths of the child arrays are appended after the path of parent routes
        children: [
          // $$ full path: products/:id/edit/info
          { path: 'info', component: ProductEditInfoComponent },
          // $$ full path: products/:id/edit/tags
          { path: 'tags', component: ProductEditTagsComponent },
          { path: '', redirectTo: 'info', pathMatch: 'full' }
        ]
      }
    ])
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
    ProductFilterPipe
  ],
  providers: [
    ProductService
  ]
})
export class ProductModule {}
