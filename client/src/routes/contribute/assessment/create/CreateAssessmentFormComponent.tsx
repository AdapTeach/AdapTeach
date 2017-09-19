import * as React from 'react'
import {all, any, append, equals, isEmpty, not, pick, reject, remove} from 'ramda'
import {ObjectiveSearch} from '../../../../widgets/common/ObjectiveSearch'
import {Objective} from '../../../../core/domain/Objective'
import {ObjectiveComponent} from '../../../../widgets/common/ObjectiveComponent'
import {UUID} from '../../../../core/domain/UUID'
import {ItemSearch} from '../../../../widgets/common/ItemSearch'
import {ItemComponent} from '../../../../widgets/common/ItemComponent'
import {assessmentEndpoint} from '../../../../endpoint/index'
import {AssessmentFields} from '../../../../core/domain/Assessment'
import {connect} from 'react-rx-pure-connect'
import {CreateAssessmentFormState as State} from './CreateAssessmentFormState'
import {createAssessmentRouteStore} from './store'

const formStore = createAssessmentRouteStore.focusOn('form')
const answersLens = formStore.lens.focusOn('answers')
const answerStore = formStore.focusOn('answers')

const onSubmit = (state: State) => e => {
   e.preventDefault()
   const fields: AssessmentFields = pick([
      'question',
      'answers',
      'prerequisiteIds',
      'assessedItemIds',
      'activelyRecalledItemIds',
      'passivelyRecalledItemIds'
   ], state)
   fields.type = 'Quiz'
   assessmentEndpoint
      .post(fields)
      .subscribe(assessment => console.log(assessment))
}

const isFormValid = (state: State): boolean => state.question.length > 5
   && state.answers.length > 1
   && all(answer => answer.text.length > 0, state.answers)
   && any(answer => answer.correct, state.answers)
   && not(isEmpty(state.assessedItemIds))


const onQuestionChange = (e) => formStore.setFieldValues({question: e.target.value})

const onAddAnswerButtonClick = () => answerStore.update(append({text: '', correct: false}))

const onAnswerTextChange = (index) => (e) => formStore.update(
   answersLens
      .focusIndex(index)
      .throwIfUndefined()
      .focusOn('text')
      .setValue(e.target.value))

const onAnswerCorrectChange = (index) => () => formStore.update(
   answersLens
      .focusIndex(index)
      .throwIfUndefined()
      .focusOn('correct')
      .update(value => !value))

const onDeleteButtonClick = (index) => () => answerStore.update(remove(index, 1))

const showPrerequisiteSearchForm = () => formStore.setFieldValues({prerequisiteSearchFormIsVisible: true})

const onPrerequisiteSelection = (objective: Objective) => formStore.updateFields({
   prerequisiteIds: append(objective.uuid),
   prerequisiteSearchFormIsVisible: () => false
})

const removePrerequisite = (id: UUID) => () => formStore.updateFields({
   prerequisiteIds: reject(equals(id))
})

const showAssessedItemSearchForm = () => formStore.setFieldValues({
   assessedItemSearchFormIsVisible: true
})

const onAssessedItemSelection = (uuid: UUID) => formStore.updateFields({
   assessedItemIds: append(uuid),
   assessedItemSearchFormIsVisible: () => false
})

const removeAssessedItem = (id: UUID) => () => formStore.updateFields({
   assessedItemIds: reject(equals(id))
})

const showActivelyRecalledItemSearchForm = () => formStore.setFieldValues({activelyRecalledItemSearchFormIsVisible: true})

const removeActivelyRecalledItem = (id: UUID) => () => formStore.updateFields({
   activelyRecalledItemIds: reject(equals(id))
})

const onActivelyRecalledItemSelection = (id: UUID) => formStore.updateFields({
   activelyRecalledItemIds: append(id),
   activelyRecalledItemSearchFormIsVisible: () => false
})

const showPassivelyRecalledItemSearchForm = () => formStore.setFieldValues({passivelyRecalledItemSearchFormIsVisible: true})

const removePassivelyRecalledItem = (id: UUID) => () => formStore.updateFields({
   passivelyRecalledItemIds: reject(equals(id))
})

const onPassivelyRecalledItemSelection = (id: UUID) => formStore.updateFields({
   passivelyRecalledItemIds: append(id),
   passivelyRecalledItemSearchFormIsVisible: () => false
})

const Component: React.StatelessComponent<State> = (state) => <form onSubmit={onSubmit(state)}>
   Question <br/>
   <textarea placeholder='Type question here' value={state.question}
             onChange={onQuestionChange}
             autoFocus
             style={{width: '100%'}} rows={4}/>
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
      onSelect={onAssessedItemSelection}/>}
   <hr/>
   Actively recalled items
   &nbsp;
   {state.activelyRecalledItemSearchFormIsVisible ||
   <input type='button' value='Add' onClick={showActivelyRecalledItemSearchForm}/>}
   <ul>{state.activelyRecalledItemIds.map(id =>
      <li key={id}>
         <ItemComponent id={id}/>&nbsp;
         <input type='button' value='X' onClick={removeActivelyRecalledItem(id)}/>
      </li>)}
   </ul>
   {state.activelyRecalledItemSearchFormIsVisible && <ItemSearch
      suggestionsToReject={state.activelyRecalledItemIds}
      onSelect={onActivelyRecalledItemSelection}/>}
   <hr/>
   Passively recalled items
   &nbsp;
   {state.passivelyRecalledItemSearchFormIsVisible ||
   <input type='button' value='Add' onClick={showPassivelyRecalledItemSearchForm}/>}
   <ul>{state.passivelyRecalledItemIds.map(id =>
      <li key={id}>
         <ItemComponent id={id}/>&nbsp;
         <input type='button' value='X' onClick={removePassivelyRecalledItem(id)}/>
      </li>)}
   </ul>
   {state.passivelyRecalledItemSearchFormIsVisible && <ItemSearch
      suggestionsToReject={state.passivelyRecalledItemIds}
      onSelect={onPassivelyRecalledItemSelection}/>}
   <hr/>
   <input type='submit' value='Create' disabled={!isFormValid(state)}/>
</form>

export const CreateAssessmentFormComponent = connect(Component).to(formStore.state$)
