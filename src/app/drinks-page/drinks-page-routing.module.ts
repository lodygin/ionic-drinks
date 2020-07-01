import {NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'

import {DrinksPagePage} from './drinks-page.page'

const routes: Routes = [
  {
    path: '',
    component: DrinksPagePage
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DrinksPagePageRoutingModule {
}
