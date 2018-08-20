import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LoginComponent
  ],
  providers: [
    AuthService
  ]
})
export class UserModule {}
