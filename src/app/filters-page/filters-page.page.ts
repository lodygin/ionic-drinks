import {Component} from '@angular/core'
import {Filter} from '../shared/interfaces'
import {FiltersService} from '../shared/services/filters.service'
import {Router} from '@angular/router'
import {Subscription} from 'rxjs'

@Component({
  selector: 'app-filters-page',
  templateUrl: './filters-page.page.html',
  styleUrls: ['./filters-page.page.scss']
})
export class FiltersPagePage {
  filters: Filter[]
  isLoading: boolean = true
  isDisableBtn: boolean = false
  fSub: Subscription

  constructor(
    private filtersService: FiltersService,
    private router: Router
  ) {
  }

  ionViewDidEnter(): void {
    if (this.filtersService.filters) {
      this.filters = this.filtersService.filters
      this.isLoading = false
    } else {
      this.fSub = this.filtersService.getFiltersUpdate()
        .subscribe((filters: Filter[]) => {
          this.filters = filters
          this.isLoading = false
        })
    }
  }

  onApply(): void {
    const filtersState: Filter[] = this.filters.filter(filter => filter.checked)
    this.filtersService.setCurrentFiltersUpdate(filtersState)
    this.isDisableBtn = true
    this.router.navigate(['/drinks'])
  }

  ionViewDidLeave(): void {
    this.isDisableBtn = false
    if (this.fSub) this.fSub.unsubscribe()
  }
}
