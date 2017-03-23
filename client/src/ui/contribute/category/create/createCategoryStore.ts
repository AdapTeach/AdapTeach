import {PartialDiff, Store} from 'sparix'
import {Category} from '../../../../core/domain/Category'
import {categoryEndpoint} from '../../../../endpoint/index'

export interface CreateCategoryState {
   nameInputValue: string,
   nameSuggestions: Category[],
   parentInputValue: string,
   parentSuggestions: Category[],
   selectedParentSuggestion?: Category
}

const initialState = {
   nameInputValue: '',
   nameSuggestions: [],
   parentInputValue: '',
   parentSuggestions: [],
   selectedParentSuggestion: undefined
}

class CreateCategoryStore extends Store<CreateCategoryState> {

   constructor() {
      super(initialState)
   }

   updateState(diff: PartialDiff<CreateCategoryState>) {
      super.updateState(diff)
   }

   resetState() {
      super.updateState(initialState)
   }

}

export const createCategoryStore = new CreateCategoryStore()

createCategoryStore
   .select('nameInputValue')
   .filter(input => input.length > 2)
   .switchMap(input => categoryEndpoint.searchByName(input))
   .subscribe(nameSuggestions => createCategoryStore.updateState({
      nameSuggestions
   }))

createCategoryStore
   .select('nameInputValue')
   .filter(input => input.length <= 2)
   .subscribe(() => createCategoryStore.updateState({
      nameSuggestions: []
   }))

createCategoryStore
   .select('parentInputValue')
   .filter(input => input.length > 2)
   .switchMap(input => categoryEndpoint.searchByName(input))
   .subscribe(parentSuggestions => createCategoryStore.updateState({
      parentSuggestions
   }))
