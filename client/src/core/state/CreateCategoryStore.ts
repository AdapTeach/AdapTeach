import {Store} from 'sparix'
import {Category} from '../domain/Category'

interface CreateCategoryState {
   suggestions: Category[]
}

export class CreateCategoryStore extends Store<CreateCategoryState> {

   constructor() {
      super({
         suggestions: []
      })
   }

   setSuggestions(suggestions: Category[]) {
      this.updateState({
         suggestions
      })
   }

}
