import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent }
    ])
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class UserModule {}
