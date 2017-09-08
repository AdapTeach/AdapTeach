import * as React from 'react'
import {append, equals, reject, remove} from 'ramda'
import {createLens} from 'immutable-lens'
import {CreateAssessmentFormState as State, createAssessmentFormStore as store} from './createAssessmentFormStore'
import {ObjectiveSearch} from '../../../common/ObjectiveSearch'
import {Objective} from '../../../../core/domain/Objective'
import {ObjectiveComponent} from '../../../common/ObjectiveComponent'
import {UUID} from '../../../../core/domain/UUID'

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

const showPrerequisiteDialog = () => store.updateState({prerequisiteDialogVisible: true})
// const hidePrerequisiteDialog = () => store.updateState({prerequisiteDialogVisible: false})

const onObjectiveSearchConfirm = (objective: Objective) => store.updateState({
   prerequisiteIds: append(objective.uuid),
   prerequisiteDialogVisible: false
})

const removePrerequisite = (id: UUID) => () => store.update(createLens<State>().updateFields({
   prerequisiteIds: reject(equals(id))
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
   <input type='button' value='Add' onClick={showPrerequisiteDialog} hidden={state.prerequisiteDialogVisible}/>
   <ul>{state.prerequisiteIds.map(prerequisiteId =>
      <li key={prerequisiteId}>
         <ObjectiveComponent id={prerequisiteId}/>
         &nbsp;
         <input type='button' value='X' onClick={removePrerequisite(prerequisiteId)}/>
      </li>)}
   </ul>
   <ObjectiveSearch visible={state.prerequisiteDialogVisible}
                    rejectedSuggestions={state.prerequisiteIds}
                    onSelect={onObjectiveSearchConfirm}/>
   <hr/>
   Assessed Items
   <hr/>
   Actively recalled items
   <hr/>
   Passively recalled items
   <hr/>
   <input type='submit' value='Create' disabled={!state.valid}/>
</form>

export const CreateAssessmentForm = store.connect(Component)
