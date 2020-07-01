import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiltersPagePageRoutingModule } from './filters-page-routing.module';

import { FiltersPagePage } from './filters-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiltersPagePageRoutingModule
  ],
  declarations: [FiltersPagePage]
})
export class FiltersPagePageModule {}
