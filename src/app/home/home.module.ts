import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { CatalogModule } from '../catalog/catalog.module';
import { LayoutsModule } from '../layouts/layouts.module';



@NgModule({
  exports: [
    HomeComponent
  ],
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    CatalogModule,
    LayoutsModule,
  ]
})
export class HomeModule { }
