import * as React from 'react'
import * as Autosuggest from 'react-autosuggest'
import {F} from 'ramda'
import {BehaviorSubject, Observable} from 'rxjs'
import {Button} from '@blueprintjs/core'
import {connect} from '../../../util/connect'
import {categoryEndpoint} from '../../../endpoint/index'
import {Category} from '../../../core/domain/Category'
import {createCategoryStore} from '../../../core/state/index'
import {path} from '../../../router/path'
import {router} from '../../../router/router'

const inputValue$ = new BehaviorSubject<string>('')

inputValue$
   .filter(input => input.length > 2)
   .switchMap(searchInput => categoryEndpoint.searchByName(searchInput))
   .subscribe(existingCategories => createCategoryStore.setSuggestions(existingCategories))

const onSubmit = e => {
   e.preventDefault()
   console.log(inputValue$.getValue())
   categoryEndpoint
      .post({
         name: inputValue$.getValue()
      })
      // .subscribe(createdCategory => console.log(createdCategory))
      .subscribe(createdCategory => router.goTo(path.contribute.category.display(createdCategory.uuid)))
}

const onSuggestionsFetchRequested = F

const onSuggestionsClearRequested = () => createCategoryStore.setSuggestions([])

const getSuggestionValue = (suggestedCategory: Category) => ''

const renderSuggestion = (suggestedCategory: Category) =>
   <div onClick={() => console.log('Navigate to category')}>
      {suggestedCategory.name}
   </div>

const onInputValueChange = (event, {newValue, method}) => inputValue$.next(newValue)

interface Props {
   inputValue: string,
   suggestions: Category[]
}

const component: React.StatelessComponent<Props> = ({inputValue, suggestions}) =>
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
         <Button onClick={onSubmit}>Create</Button>
      </form>
   </div>

const propsMapper = () => Observable.combineLatest(
   inputValue$,
   createCategoryStore.select('suggestions'),
   (inputValue, suggestions) => ({inputValue, suggestions})
)

export const CreateCategory = connect(propsMapper)(component)

// <TextField onChange={::this.onNameChange} hintText="Name" ref="categoryName"/><br/>
// <label>Parent Category</label>
//    {this.state.parent
//       ? <div>{this.state.parent.name}</div>
//       : <CategorySearch onSelect={::this.onParentChange}/>}
{/*<RaisedButton onClick={::this.create} primary label="Create"/>*/
}
{/*</form>*/
}
{/*</div>*/
}
