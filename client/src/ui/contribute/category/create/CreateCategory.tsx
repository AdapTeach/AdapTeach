import * as React from 'react'
import {Route} from 'react-router-dom'
import {categoryEndpoint} from '../../../../endpoint/index'
import {Category} from '../../../../core/domain/Category'
import {path} from '../../../../router/path'
import {router} from '../../../../router/router'
import {CreateCategoryState, createCategoryStore} from './createCategoryStore'
import {ConnectedComponent} from 'react-rx-pure-connect'

const goToDisplay = (category: Category) => router.goTo(path.contribute.category.display(category.uuid))

const onSubmit = (state: CreateCategoryState) => e => {
   e.preventDefault()
   categoryEndpoint
      .post({
         name: state.nameInputValue,
         parent: state.selectedParentSuggestion && state.selectedParentSuggestion.uuid
      })
      .subscribe(createdCategory => {
         createCategoryStore.resetState()
         goToDisplay(createdCategory)
      })
}

const onNameInputChange = e => createCategoryStore.updateState({
   nameInputValue: e.target.value
})

const NameSuggestion = (category: Category) =>
   <li key={category.uuid} onClick={onNameSuggestionClick(category)}>
      {category.name}
   </li>

const onNameSuggestionClick = (category: Category) => e => {
   createCategoryStore.resetState()
   goToDisplay(category)
}

const onParentInputChange = e => createCategoryStore.updateState({
   parentInputValue: e.target.value
})

const ParentSuggestion = (category: Category) =>
   <li key={category.uuid} onClick={onParentSuggestionClick(category)}>
      {category.name}
   </li>

const onParentSuggestionClick = (selectedParentSuggestion: Category) => e => createCategoryStore.updateState({
   parentInputValue: '',
   parentSuggestions: [],
   selectedParentSuggestion
})

const Component = (state: CreateCategoryState) =>
   <div>
      <h2>Create Category</h2>
      <form onSubmit={onSubmit(state)}>
         <input placeholder='Name'
                value={state.nameInputValue}
                onChange={onNameInputChange}/>
         <ul>
            {state.nameSuggestions.map(NameSuggestion)}
         </ul>
         {!state.selectedParentSuggestion && <input placeholder='Parent'
                                                    value={state.parentInputValue}
                                                    onChange={onParentInputChange}/>}
         <ul>
            {state.parentSuggestions.map(ParentSuggestion)}
         </ul>
         {state.selectedParentSuggestion && <div>Parent: {state.selectedParentSuggestion.name}</div>}
         <button onClick={onSubmit(state)}>Create</button>
      </form>
   </div>

export const CreateCategory: ConnectedComponent<{}> = createCategoryStore.connect(Component)
