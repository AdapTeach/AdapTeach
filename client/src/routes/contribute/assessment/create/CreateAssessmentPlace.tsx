import * as React from 'react'
import { all, any, append, equals, isEmpty, not, pick, reject, remove } from 'ramda'
import { ObjectiveSearch } from '../../../../widgets/common/ObjectiveSearch'
import { Objective } from '../../../../core/domain/Objective'
import { ObjectiveComponent } from '../../../../widgets/common/ObjectiveComponent'
import { UUID } from '../../../../core/domain/UUID'
import { ItemSearch } from '../../../../widgets/common/ItemSearch'
import { ItemComponent } from '../../../../widgets/common/ItemComponent'
import { assessmentEndpoint } from '../../../../endpoint/index'
import { AssessmentFields, AssessmentAnswer } from '../../../../core/domain/Assessment'
import { routesStore } from '../../../../state/store'
import { CreateAssessmentState as State } from './CreateAssessmentState'
import { connect } from 'react-rx-pure-connect'
import { rxForm } from 'rx-react-form'
import { createAssessmentStore } from './createAssessmentStore'

const store = createAssessmentStore

const onSubmit = (state: State) => e => {
   e.preventDefault()
   store.dispatch({ createAssessment: undefined })
}

const isFormValid: (form: AssessmentFields) => boolean = (form) => form.question.length > 5
   && form.answers.length > 1
   && all(answer => answer.text.length > 0, form.answers)
   && any(answer => answer.correct, form.answers)
   && not(isEmpty(form.assessedItemIds))

const onQuestionChange = (e) => store.dispatch({ updateFields: { question: e.target.value } })

const onAddAnswerButtonClick = () => store.dispatch({ addAnswer: undefined })

const onAnswerTextChange = (index) => (e) => store.dispatch({ updateAnswer: { index, answer: { text: e.target.value } } })

const onAnswerCorrectChange = (index) => (e) => store.dispatch({ toggleAnswerIsCorrect: { index } })

const onDeleteButtonClick = (index) => () => store.dispatch({ deleteAnswer: { index } })

const showPrerequisiteSearchForm = () => store.dispatch({ showPrerequisitesSearchForm: undefined })

const onPrerequisiteSelection = (objective: Objective) => store.dispatch({ onPrerequisiteSelection: { objective } })

const removePrerequisite = (id: UUID) => () => store.dispatch({ removePrerequisite: { id } })

const showAssessedItemSearchForm = () => store.dispatch({ showAssessedItemSearchForm: undefined })

const onAssessedItemSelection = (id: UUID) => store.dispatch({ onAssessedItemSelection: { id } })

const removeAssessedItem = (id: UUID) => () => store.dispatch({ removeAssessedItem: { id } })

const showActivelyRecalledItemSearchForm = () => store.dispatch({ showActivelyRecalledItemSearchForm: undefined })

const onActivelyRecalledItemSelection = (id: UUID) => store.dispatch({ onActivelyRecalledItemSelection: { id } })

const removeActivelyRecalledItem = (id: UUID) => () => store.dispatch({ removeAssessedItem: { id } })

const showPassivelyRecalledItemSearchForm = () => store.dispatch({ showPassivelyRecalledItemSearchForm: undefined })

const onPassivelyRecalledItemSelection = (id: UUID) => store.dispatch({ onPassivelyRecalledItemSelection: { id } })

const removePassivelyRecalledItem = (id: UUID) => () => store.dispatch({ removePassivelyRecalledItem: { id } })

const Component: React.SFC<State> = (state) => <div>
   <h1>Create Assessment</h1>
   <form onSubmit={onSubmit(state)}>
      Question <br />
      <textarea placeholder='Type question here' value={state.form.question}
         onChange={onQuestionChange}
         autoFocus
         style={{ width: '100%' }} rows={4} />
      <hr />
      Answers
      &nbsp;
      <input type='button' value='Add' onClick={onAddAnswerButtonClick} />
      <ul>{state.form.answers.map((answer, index) => <li key={index}>
         <input value={answer.text} onChange={onAnswerTextChange(index)} placeholder='Type answer here' />
         <input type='checkbox'
            checked={answer.correct}
            onChange={onAnswerCorrectChange(index)} />
         <input type='button' value='X' onClick={onDeleteButtonClick(index)} />
      </li>)}</ul>
      <hr />
      Prerequisites
      &nbsp;
      {state.prerequisiteSearchFormIsVisible || <input type='button' value='Add' onClick={showPrerequisiteSearchForm} />}
      <ul>{state.form.prerequisiteIds.map(prerequisiteId =>
         <li key={prerequisiteId}>
            <ObjectiveComponent id={prerequisiteId} />&nbsp;
            <input type='button' value='X' onClick={removePrerequisite(prerequisiteId)} />
         </li>)}
      </ul>
      {state.prerequisiteSearchFormIsVisible && <ObjectiveSearch
         suggestionsToReject={state.form.prerequisiteIds}
         onSelect={onPrerequisiteSelection} />}
      <hr />
      Assessed Items
      &nbsp;
      {state.assessedItemSearchFormIsVisible || <input type='button' value='Add' onClick={showAssessedItemSearchForm} />}
      <ul>{state.form.assessedItemIds.map(assessedItemId =>
         <li key={assessedItemId}>
            <ItemComponent id={assessedItemId} />&nbsp;
            <input type='button' value='X' onClick={removeAssessedItem(assessedItemId)} />
         </li>)}
      </ul>
      {state.assessedItemSearchFormIsVisible && <ItemSearch
         suggestionsToReject={state.form.assessedItemIds}
         onSelect={onAssessedItemSelection} />}
      <hr />
      Actively recalled items
      &nbsp;
      {state.activelyRecalledItemSearchFormIsVisible ||
         <input type='button' value='Add' onClick={showActivelyRecalledItemSearchForm} />}
      <ul>{state.form.activelyRecalledItemIds!.map(id =>
         <li key={id}>
            <ItemComponent id={id} />&nbsp;
            <input type='button' value='X' onClick={removeActivelyRecalledItem(id)} />
         </li>)}
      </ul>
      {state.activelyRecalledItemSearchFormIsVisible && <ItemSearch
         suggestionsToReject={state.form.activelyRecalledItemIds}
         onSelect={onActivelyRecalledItemSelection} />}
      <hr />
      Passively recalled items
      &nbsp;
      {state.passivelyRecalledItemSearchFormIsVisible ||
         <input type='button' value='Add' onClick={showPassivelyRecalledItemSearchForm} />}
      <ul>{state.form.passivelyRecalledItemIds!.map(id =>
         <li key={id}>
            <ItemComponent id={id} />&nbsp;
            <input type='button' value='X' onClick={removePassivelyRecalledItem(id)} />
         </li>)}
      </ul>
      {state.passivelyRecalledItemSearchFormIsVisible && <ItemSearch
         suggestionsToReject={state.form.passivelyRecalledItemIds}
         onSelect={onPassivelyRecalledItemSelection} />}
      <hr />
      <input type='submit' value='Create' disabled={!isFormValid(state.form)} />
   </form>
</div>

export const CreateAssessmentPlace = connect(Component).to(store.state$)
