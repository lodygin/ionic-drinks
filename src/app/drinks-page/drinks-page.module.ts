import {NgModule} from '@angular/core'
import {CommonModule} from '@angular/common'
import {FormsModule} from '@angular/forms'

import {IonicModule} from '@ionic/angular'

import {DrinksPagePageRoutingModule} from './drinks-page-routing.module'

import {DrinksPagePage} from './drinks-page.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrinksPagePageRoutingModule
  ],
  declarations: [DrinksPagePage]
})
export class DrinksPagePageModule {
}
