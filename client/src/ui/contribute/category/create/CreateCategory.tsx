import * as React from 'react'
import {Route} from 'react-router-dom'
import * as Autosuggest from 'react-autosuggest'
import {F} from 'ramda'
import {BehaviorSubject, Observable} from 'rxjs'
import {categoryEndpoint} from '../../../../endpoint/index'
import {Category} from '../../../../core/domain/Category'
import {createCategoryStore} from '../../../../core/state/index'
import {path} from '../../../../router/path'
import {router} from '../../../../router/router'
import {connect} from 'react-rx-pure-connect'

const inputValue$ = new BehaviorSubject<string>('')

const goToDisplay = (category: Category) => router.goTo(path.contribute.category.display(category.uuid))

inputValue$
   .filter(input => input.length > 2)
   .switchMap(searchInput => categoryEndpoint.searchByName(searchInput))
   .subscribe(existingCategories => createCategoryStore.setSuggestions(existingCategories))

const onSubmit = e => {
   e.preventDefault()
   categoryEndpoint
      .post({name: inputValue$.getValue()})
      .subscribe(createdCategory => {
         inputValue$.next('')
         goToDisplay(createdCategory)
      })
}

const onSuggestionsFetchRequested = F

const onSuggestionsClearRequested = () => createCategoryStore.setSuggestions([])

const getSuggestionValue = (suggestedCategory: Category) => ''

const renderSuggestion = (suggestedCategory: Category) =>
   <div onClick={() => goToDisplay(suggestedCategory)}>
      {suggestedCategory.name}
   </div>

const onInputValueChange = (event, {newValue, method}) => inputValue$.next(newValue)

interface Props {
   inputValue: string,
   suggestions: Category[]
}

const Component: React.StatelessComponent<Props> = ({inputValue, suggestions}) =>
   <div>
      <h2>Create Category</h2>
      <form onSubmit={onSubmit}>
         <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
            onSuggestionsClearRequested={onSuggestionsClearRequested}
            getSuggestionValue={getSuggestionValue}
            renderSuggestion={renderSuggestion}
            inputProps={{
               value: inputValue,
               onChange: onInputValueChange
            }}/>
         <button onClick={onSubmit}>Create</button>
      </form>
   </div>

const propsMapper = () => Observable.combineLatest(
   inputValue$,
   createCategoryStore.select('suggestions'),
   (inputValue, suggestions) => ({inputValue, suggestions})
)

export const CreateCategory = connect(propsMapper)(Component)
