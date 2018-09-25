import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './user/auth.guard';

@NgModule({
  imports: [
    CommonModule,
    // $$ orders matter as first match wins
    RouterModule.forRoot([
        // $$ Config for lazily loading ProductModule
        { path: 'products', canLoad: [AuthGuard], loadChildren: 'src/app/products/product.module#ProductModule'},
        { path: 'welcome', component: WelcomeComponent },
        { path: '', redirectTo: 'welcome', pathMatch: 'full' },
        { path: '**', component: PageNotFoundComponent }
      ],
      // $$ this logs navigation events into browser console
      /* { enableTracing: true } */
    )
  ],
  exports: [
    // $$ Export the RouterModule so that the root AppModule doesn't have to import it again
    RouterModule
  ]
})
export class AppRoutingModule {}
