import {Injectable} from '@angular/core'
import {HttpClient} from '@angular/common/http'
import {Drinks, Response} from '../interfaces'
import {map} from 'rxjs/operators'
import {Subject} from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class DrinksService {

  categoryLength: number = 4
  drinksUpdate: Subject<Drinks> = new Subject<Drinks>()

  constructor(
    private http: HttpClient
  ) {
  }

  getDrinks(category: string): void {
    this.http.get<Response>('https://www.thecocktaildb.com/api/json/v1/1/filter.php', {
      params: {c: category}
    })
      .pipe(
        map(((res: Response): Drinks => {
          if (res.drinks.length > this.categoryLength) {
            (res.drinks.length as number) = this.categoryLength
          }
          return {
            title: category,
            list: res.drinks
          }
        }))
      )
      .subscribe((res: Drinks) => {
        this.drinksUpdate.next(res)
      })
  }

}
