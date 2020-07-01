import {NgModule} from '@angular/core'
import {PreloadAllModules, RouterModule, Routes} from '@angular/router'

const routes: Routes = [
  {path: '', redirectTo: '/drinks', pathMatch: 'full'},
  {
    path: 'drinks',
    loadChildren: () => import('./drinks-page/drinks-page.module')
      .then(m => m.DrinksPagePageModule)
  },
  {
    path: 'filters',
    loadChildren: () => import('./filters-page/filters-page.module')
      .then(m => m.FiltersPagePageModule)
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
