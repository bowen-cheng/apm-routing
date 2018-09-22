import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// Imports for loading & configuring the in-memory web api
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { MessageModule } from './messages/message.module';
import { PageNotFoundComponent } from './page-not-found.component';
import { ProductData } from './products/product-data';
/* Feature Modules */
import { UserModule } from './user/user.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    InMemoryWebApiModule.forRoot(ProductData, { delay: 1000 }),
    // $$ Note that ProductModule and UserModule are imported before the root route config (RouterModule.forRoot(...)).
    // The order of importing matters because feature modules have their own route config declared (RouterModule.forChild(...)).
    // $$ Lazy loading requirement 3 - The lazily loaded feature module is not imported in any other modules
    /*ProductModule,*/
    UserModule,
    MessageModule,
    AppRoutingModule
    // $$ No need to import RouterModule any more because it is already import and exported by one of the modules above (AppRoutingModule)
    // RouterModule
  ],
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
