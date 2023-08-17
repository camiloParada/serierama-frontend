import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';

import { HeaderComponent } from './header/header.component';

@NgModule({
  exports: [
    HeaderComponent,
  ],
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    MatMenuModule,
  ]
})
export class LayoutsModule { }
