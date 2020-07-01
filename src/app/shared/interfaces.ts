export interface DrinksResponse {
  strDrink: string
  strDrinkThumb: string
  idDrink: string
}

export interface Drinks {
  title: string
  list: DrinksResponse[]
}

export interface Filter {
  strCategory: string
  checked?: boolean
}

export interface Response {
  drinks: []
}
