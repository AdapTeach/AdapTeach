import {Category} from '../../../../core/domain/Category'
import {categoryEndpoint} from '../../../../endpoint/index'
import {ComponentStore} from '../../../../util/ComponentStore'

export interface CreateCategoryState {
   nameInputValue: string,
   nameSuggestions: Category[],
   parentInputValue: string,
   parentSuggestions: Category[],
   selectedParentSuggestion?: Category
}

const initialState: CreateCategoryState = {
   nameInputValue: '',
   nameSuggestions: [],
   parentInputValue: '',
   parentSuggestions: [],
   selectedParentSuggestion: undefined
}

export const createCategoryStore = ComponentStore.create(initialState)

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
