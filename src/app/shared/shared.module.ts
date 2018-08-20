import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { StarComponent } from './star.component';

@NgModule({
  imports: [CommonModule],
  exports: [
    CommonModule,
    FormsModule,
    StarComponent
  ],
  declarations: [StarComponent]
})
export class SharedModule {}
