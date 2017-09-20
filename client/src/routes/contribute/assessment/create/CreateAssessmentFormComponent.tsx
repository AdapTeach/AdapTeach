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
import {CreateAssessmentState as State} from './state'
import {createAssessmentRouteStore as store} from './store'

const formLens = store.lens.focusOn('form')

const formStore = store.focusOn('form')
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
   ], state.form)
   fields.type = 'Quiz'
   assessmentEndpoint
      .post(fields)
      .subscribe(assessment => console.log(assessment))
}

const isFormValid: (form: AssessmentFields) => boolean = (form) => form.question.length > 5
   && form.answers.length > 1
   && all(answer => answer.text.length > 0, form.answers)
   && any(answer => answer.correct, form.answers)
   && not(isEmpty(form.assessedItemIds))


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

const showPrerequisiteSearchForm = () => store.setFieldValues({prerequisiteSearchFormIsVisible: true})

const onPrerequisiteSelection = (objective: Objective) => store.pipe(
   formLens.updateFields({prerequisiteIds: append(objective.uuid)}),
   store.lens.setFieldValues({prerequisiteSearchFormIsVisible: false})
)

const removePrerequisite = (id: UUID) => () => formStore.updateFields({
   prerequisiteIds: reject(equals(id))
})

const showAssessedItemSearchForm = () => store.setFieldValues({
   assessedItemSearchFormIsVisible: true
})

const onAssessedItemSelection = (uuid: UUID) => store.pipe(
   formLens.updateFields({assessedItemIds: append(uuid)}),
   store.lens.setFieldValues({assessedItemSearchFormIsVisible: false})
)

const removeAssessedItem = (id: UUID) => () => formStore.updateFields({
   assessedItemIds: reject(equals(id))
})

const showActivelyRecalledItemSearchForm = () => store.setFieldValues({
   activelyRecalledItemSearchFormIsVisible: true
})

const removeActivelyRecalledItem = (id: UUID) => () => formStore.updateFields({
   activelyRecalledItemIds: reject(equals(id))
})

const onActivelyRecalledItemSelection = (id: UUID) => store.pipe(
   formLens.updateFields({activelyRecalledItemIds: append(id)}),
   store.lens.setFieldValues({activelyRecalledItemSearchFormIsVisible: false})
)

const showPassivelyRecalledItemSearchForm = () => store.setFieldValues({
   passivelyRecalledItemSearchFormIsVisible: true
})

const removePassivelyRecalledItem = (id: UUID) => () => formStore.updateFields({
   passivelyRecalledItemIds: reject(equals(id))
})

const onPassivelyRecalledItemSelection = (id: UUID) => store.pipe(
   formLens.updateFields({passivelyRecalledItemIds: append(id)}),
   store.lens.setFieldValues({passivelyRecalledItemSearchFormIsVisible: false})
)

const Component: React.StatelessComponent<State> = (state) => <form onSubmit={onSubmit(state)}>
   Question <br/>
   <textarea placeholder='Type question here' value={state.form.question}
             onChange={onQuestionChange}
             autoFocus
             style={{width: '100%'}} rows={4}/>
   <hr/>
   Answers
   &nbsp;
   <input type='button' value='Add' onClick={onAddAnswerButtonClick}/>
   <ul>{state.form.answers.map((answer, index) => <li key={index}>
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
   <ul>{state.form.prerequisiteIds.map(prerequisiteId =>
      <li key={prerequisiteId}>
         <ObjectiveComponent id={prerequisiteId}/>&nbsp;
         <input type='button' value='X' onClick={removePrerequisite(prerequisiteId)}/>
      </li>)}
   </ul>
   {state.prerequisiteSearchFormIsVisible && <ObjectiveSearch
      suggestionsToReject={state.form.prerequisiteIds}
      onSelect={onPrerequisiteSelection}/>}
   <hr/>
   Assessed Items
   &nbsp;
   {state.assessedItemSearchFormIsVisible || <input type='button' value='Add' onClick={showAssessedItemSearchForm}/>}
   <ul>{state.form.assessedItemIds.map(assessedItemId =>
      <li key={assessedItemId}>
         <ItemComponent id={assessedItemId}/>&nbsp;
         <input type='button' value='X' onClick={removeAssessedItem(assessedItemId)}/>
      </li>)}
   </ul>
   {state.assessedItemSearchFormIsVisible && <ItemSearch
      suggestionsToReject={state.form.assessedItemIds}
      onSelect={onAssessedItemSelection}/>}
   <hr/>
   Actively recalled items
   &nbsp;
   {state.activelyRecalledItemSearchFormIsVisible ||
   <input type='button' value='Add' onClick={showActivelyRecalledItemSearchForm}/>}
   <ul>{state.form.activelyRecalledItemIds.map(id =>
      <li key={id}>
         <ItemComponent id={id}/>&nbsp;
         <input type='button' value='X' onClick={removeActivelyRecalledItem(id)}/>
      </li>)}
   </ul>
   {state.activelyRecalledItemSearchFormIsVisible && <ItemSearch
      suggestionsToReject={state.form.activelyRecalledItemIds}
      onSelect={onActivelyRecalledItemSelection}/>}
   <hr/>
   Passively recalled items
   &nbsp;
   {state.passivelyRecalledItemSearchFormIsVisible ||
   <input type='button' value='Add' onClick={showPassivelyRecalledItemSearchForm}/>}
   <ul>{state.form.passivelyRecalledItemIds.map(id =>
      <li key={id}>
         <ItemComponent id={id}/>&nbsp;
         <input type='button' value='X' onClick={removePassivelyRecalledItem(id)}/>
      </li>)}
   </ul>
   {state.passivelyRecalledItemSearchFormIsVisible && <ItemSearch
      suggestionsToReject={state.form.passivelyRecalledItemIds}
      onSelect={onPassivelyRecalledItemSelection}/>}
   <hr/>
   <input type='submit' value='Create' disabled={!isFormValid(state.form)}/>
</form>

export const CreateAssessmentFormComponent = connect(Component).to(store.state$)
