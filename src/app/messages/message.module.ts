import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { MessageComponent } from './message.component';
import { MessageService } from './message.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        outlet: 'popup', // $$ 'outlet' defines WHERE to display (which secondary RouterOutlet should be activated)
        path: 'messages', // $$ 'path' (and 'component') defines WHAT to display (what template to place into the RouterOutlet)
        component: MessageComponent
      }
      // $$ this could be potentially another route config that places a different view into the same RouterOutlet with a different 'path'
      /*
      {
        outlet: 'popup',
        path: 'summary',
        component: SummaryComponent
      }
      */
    ])
  ],
  declarations: [
    MessageComponent
  ],
  providers: [
    MessageService
  ]
})
export class MessageModule {}
