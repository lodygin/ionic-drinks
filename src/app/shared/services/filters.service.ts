import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Filter, Response} from '../interfaces'
import {Subject} from 'rxjs'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class FiltersService {

  filters: Filter[]
  currentFilters: Filter[]
  filtersUpdate: Subject<Filter[]> = new Subject<Filter[]>()

  constructor(
    private http: HttpClient
  ) {
  }

  getAllFilters(): void {
    this.http.get<Response>('https://www.thecocktaildb.com/api/json/v1/1/list.php', {
      params: {c: 'list'}
    })
      .pipe(
        map((res: Response): Filter[] => res.drinks)
      )
      .subscribe((res: Filter[]) => {
        res.forEach((filter: Filter) => filter.checked = true)
        this.filters = res
        this.currentFilters = res
        this.filtersUpdate.next(this.filters)
      })
  }

  getFiltersUpdate(): Subject<Filter[]> {
    return this.filtersUpdate
  }

  setCurrentFiltersUpdate(filtersState: Filter[]): void {
    this.currentFilters = filtersState
  }
}
