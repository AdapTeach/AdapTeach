import * as React from 'react'
import * as Autosuggest from 'react-autosuggest'
import {compositeEndpoint} from '../../../../endpoint/index'
import {router} from '../../../../router/router'
import {path} from '../../../../router/path'
import {CreateCompositeState, createCompositeStore, createCompositeState$} from './createCompositeStore'
import * as R from 'ramda'
import {connect} from 'react-rx-pure-connect'
import {searchedSubObjectiveNameChangedEpic} from './searchedSubObjectiveNameChangedEpic'
import {Objective} from '../../../../core/domain/Objective'

const onSuggestionsFetchRequested = R.F
const onSuggestionsClearRequested = R.F
const getSuggestionValue = R.F

const onNameChange = (e) => createCompositeStore.setName(e.target.value)

const onDescriptionChange = (e) => createCompositeStore.setDescription(e.target.value)

const onSearchedSubObjectiveNameChange = (e) => searchedSubObjectiveNameChangedEpic.next(e.target.value)

const onSuggestionClick = (objective: Objective) => () => createCompositeStore.addSubObjective(objective)

const renderSuggestion = (objective: Objective) =>
   <span onClick={onSuggestionClick(objective)}>
      {objective.name}
   </span>

const setIsAddingSubObjective = (e) => {
   e.preventDefault()
   createCompositeStore.setIsAddingSubObjective()
}

const onSubmit = (state: CreateCompositeState) => e => {
   e.preventDefault()
   if (!state.canSubmit) return
   compositeEndpoint
      .post({
         name: state.name,
         description: state.description,
         subObjectives: state.subObjectives.map(o => o.uuid)
      })
      .subscribe(createdComposite => router.goTo(path.contribute.composite.display(createdComposite.uuid)))
}

const SubObjectiveForm: React.StatelessComponent<{state: CreateCompositeState}> = ({state}) =>
   <Autosuggest
      suggestions={state.subObjectiveSuggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
               value: state.searchedSubObjectiveName,
               onChange: onSearchedSubObjectiveNameChange
            }}/>

const Component: React.StatelessComponent<CreateCompositeState> = (state) =>
   <form onSubmit={onSubmit(state)}>
      <h2>Create Composite</h2>
      <input placeholder='Name' onChange={onNameChange} value={state.name}/>
      <br />
      <input placeholder='Description' onChange={onDescriptionChange} value={state.description}/>
      <br />
      Sub-objectives:
      {state.isAddingSubObjective
         ? <SubObjectiveForm state={state}/>
         : <button onClick={setIsAddingSubObjective}>Add</button>
      }
      {state.subObjectives.map(subObjective => <div key={subObjective.uuid}>{subObjective.name}</div>)}
      <br />
      <button onClick={onSubmit(state)} disabled={!state.canSubmit}>Create</button>
   </form>

const mapProps = () => createCompositeState$

export const CreateComposite = connect(mapProps)(Component)
