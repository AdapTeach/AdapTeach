import * as React from 'react'
import {append, equals, reject, remove} from 'ramda'
import {createLens} from 'immutable-lens'
import {CreateAssessmentFormState as State, createAssessmentFormStore as store} from './createAssessmentFormStore'
import {ObjectiveSearch} from '../../../common/ObjectiveSearch'
import {Objective} from '../../../../core/domain/Objective'
import {ObjectiveComponent} from '../../../common/ObjectiveComponent'
import {UUID} from '../../../../core/domain/UUID'
import {ItemSearch} from '../../../common/ItemSearch'
import {ItemComponent} from '../../../common/ItemComponent'

const stateLens = createLens<State>()
const answersLens = stateLens.focusOn('answers')

const onSubmit = (state: State) => e => {
   e.preventDefault()
   console.log('Submit')
}

const onQuestionChange = (e) => store.updateState({question: e.target.value})

const onAddAnswerButtonClick = () => store.updateState({answers: append({text: '', correct: false})})

const onAnswerTextChange = (index) => (e) => store.update(
   answersLens
      .focusIndex(index)
      .throwIfUndefined()
      .focusOn('text')
      .setValue(e.target.value))

const onAnswerCorrectChange = (index) => () => store.update(
   answersLens
      .focusIndex(index)
      .throwIfUndefined()
      .focusOn('correct')
      .update(value => !value)
)

const onDeleteButtonClick = (index) => () => store.update(
   answersLens.update(remove(index, 1))
)

const showPrerequisiteSearchForm = () => store.updateState({prerequisiteSearchFormIsVisible: true})

const onPrerequisiteSelection = (objective: Objective) => store.updateState({
   prerequisiteIds: append(objective.uuid),
   prerequisiteSearchFormIsVisible: false
})

const removePrerequisite = (id: UUID) => () => store.update(stateLens.updateFields({
   prerequisiteIds: reject(equals(id))
}))

const showAssessedItemSearchForm = () => store.updateState({
   assessedItemSearchFormIsVisible: true
})

const onAssessedItemIdSelection = (uuid: UUID) => store.updateState({
   assessedItemIds: append(uuid),
   assessedItemSearchFormIsVisible: false
})

const removeAssessedItem = (id: UUID) => () => store.update(stateLens.updateFields({
   assessedItemIds: reject(equals(id))
}))

const Component: React.StatelessComponent<{ props: {}, state: State }> = ({state}) => <form onSubmit={onSubmit(state)}>
   Question <br/>
   <input placeholder='Type question here' onChange={onQuestionChange} autoFocus/>
   <hr/>
   Answers
   &nbsp;
   <input type='button' value='Add' onClick={onAddAnswerButtonClick}/>
   <ul>{state.answers.map((answer, index) => <li key={index}>
      <input value={answer.text} onChange={onAnswerTextChange(index)} placeholder='Type answer here'/>
      <input type='checkbox'
             checked={answer.correct}
             onChange={onAnswerCorrectChange(index)}/>
      <input type='button' value='X' onClick={onDeleteButtonClick(index)}/>
   </li>)}</ul>
   <hr/>
   Prerequisites
   &nbsp;
   {state.prerequisiteSearchFormIsVisible || <input type='button' value='Add' onClick={showPrerequisiteSearchForm}/>}
   <ul>{state.prerequisiteIds.map(prerequisiteId =>
      <li key={prerequisiteId}>
         <ObjectiveComponent id={prerequisiteId}/>&nbsp;
         <input type='button' value='X' onClick={removePrerequisite(prerequisiteId)}/>
      </li>)}
   </ul>
   {state.prerequisiteSearchFormIsVisible && <ObjectiveSearch
      suggestionsToReject={state.prerequisiteIds}
      onSelect={onPrerequisiteSelection}/>}
   <hr/>
   Assessed Items
   &nbsp;
   {state.assessedItemSearchFormIsVisible || <input type='button' value='Add' onClick={showAssessedItemSearchForm}/>}
   <ul>{state.assessedItemIds.map(assessedItemId =>
      <li key={assessedItemId}>
         <ItemComponent id={assessedItemId}/>&nbsp;
         <input type='button' value='X' onClick={removeAssessedItem(assessedItemId)}/>
      </li>)}
   </ul>
   {state.assessedItemSearchFormIsVisible && <ItemSearch
      suggestionsToReject={state.assessedItemIds}
      onSelect={onAssessedItemIdSelection}/>}
   <hr/>
   Actively recalled items
   <ItemSearch/>
   <hr/>
   Passively recalled items
   <ItemSearch/>
   <hr/>
   <input type='submit' value='Create' disabled={!state.valid}/>
</form>

export const CreateAssessmentForm = store.connect(Component)
