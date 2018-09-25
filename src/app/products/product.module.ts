import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../user/auth.guard';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductEditInfoComponent } from './product-edit-info/product-edit-info.component';
import { ProductEditTagsComponent } from './product-edit-tags/product-edit-tags.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { ProductEditGuard } from './product-edit/product-edit.guard';

import { ProductFilterPipe } from './product-filter.pipe';

import { ProductListComponent } from './product-list/product-list.component';
import { ProductResolverService } from './product-resolver.service';

@NgModule({
  imports: [
    SharedModule,
    // $$ Lazy loading requirement 2 - All children routes are under one parent
    RouterModule.forChild([
      {
        // $$ The 'path' property does not need a leading slash but routerLink directive does: <a routerLink='/products'></a>
        // Route paths with a leading slash are absolute path. E.g. starting from the root URL,
        path: '',
        // $$ By defining route guard at parent level, all children routes are also protected
        /*
        canActivate: [AuthGuard],
        */
        // $$ Component-less route: At the parent route level, there is no component matching path: 'products' (the next line is commented)
        /*
        component: ProductListComponent,
        */
        children: [
          {
            // $$ Component-less route: at child route level, the ProductListComponent is displayed as '/products'
            path: '',
            component: ProductListComponent
          },
          {
            // $$ The colon (:) symbol identifies a place holder variable, there can be as many as needed as long as they have unique names
            path: ':id',
            component: ProductDetailComponent,
            // $$ The list of resolvers is key-value pairs, where the key is a logical name, the value is a reference to the resolver
            // The key, "product", is used for retrieving data (as a class property) later in the component class (ProductDetailComponent)
            resolve: { product: ProductResolverService }
          },
          {
            path: ':id/edit',
            component: ProductEditComponent,
            // $$ The key ("product") is used as class property in ProductEditComponent, ProductEditInfoComponent, ProductEditTagsComponent
            resolve: { product: ProductResolverService },
            canDeactivate: [ProductEditGuard],
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
        ]
      }
    ])
  ],
  // $$ Lazy loading requirement 1 - All components are declared in a feature module
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductEditInfoComponent,
    ProductEditTagsComponent,
    ProductFilterPipe
  ]
})
export class ProductModule {}
