import {Component, OnDestroy, OnInit} from '@angular/core'
import {DrinksService} from '../shared/services/drinks.service'
import {Drinks, Filter} from '../shared/interfaces'
import {Subscription} from 'rxjs'
import {FiltersService} from '../shared/services/filters.service'

@Component({
  selector: 'app-drinks-page',
  templateUrl: './drinks-page.page.html',
  styleUrls: ['./drinks-page.page.scss']
})
export class DrinksPagePage implements OnInit, OnDestroy {

  drinks: Drinks[] = []
  categoriesFilters: string[]
  maxCategoriesIdx: number
  startIdx: number = 4
  currentIdx: number = this.startIdx

  isLoadingControlSub: boolean = true
  isLoadingControlAnimation: boolean = true

  dSub: Subscription
  fSub: Subscription

  set setCategoriesFilters(filters: Filter[]) {
    this.maxCategoriesIdx = filters.length
    this.categoriesFilters = filters.map(filter => filter.strCategory)
    this.getDrinksOnInit()
  }

  constructor(
    private drinksService: DrinksService,
    private filtersService: FiltersService
  ) {
  }

  ngOnInit(): void {
    if (this.filtersService.currentFilters) {
      this.setCategoriesFilters = this.filtersService.currentFilters
    } else {
      this.fSub = this.filtersService.getFiltersUpdate()
        .subscribe((res: Filter[]) => {
          this.setCategoriesFilters = res
        })
    }

    this.dSub = this.drinksService.drinksUpdate
      .subscribe((res: Drinks) => {
        this.drinks.push(res)
        this.isLoadingControlSub = false
      })
  }

  ionViewDidEnter(): void {
    this.isLoadingControlAnimation = false
  }

  getDrinksOnInit() {
    let length: number
    if (this.startIdx > this.categoriesFilters.length) {
      length = this.categoriesFilters.length
    } else {
      length = this.startIdx
    }
    for (let i = 0; i < length; i++) {
      this.drinksService.getDrinks(this.categoriesFilters[i])
    }
  }

  getDrinksOnScroll(event: any) {
    this.drinksService.getDrinks(this.categoriesFilters[this.currentIdx])
    const sub = this.drinksService.drinksUpdate
      .subscribe(() => {
        this.currentIdx = this.currentIdx + 1
        event.target.complete()
        sub.unsubscribe()
      })
  }

  ngOnDestroy(): void {
    if (this.dSub) this.dSub.unsubscribe()
    if (this.fSub) this.fSub.unsubscribe()
  }
}
