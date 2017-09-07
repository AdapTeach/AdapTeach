import * as React from 'react'
import {append, remove} from 'ramda'
import {createLens} from 'immutable-lens'
import {CreateAssessmentFormState as State, createAssessmentFormStore as store} from './createAssessmentFormStore'

const stateLens = createLens<State>()
const answersLens = stateLens.focusOn('answers')

const onSubmit = (state: State) => e => {
   e.preventDefault()
   console.log('Submit')
}

const onQuestionChange = (e) => store.updateState({question: e.target.value})

const onAddAnswerButtonClick = () => store.updateState({answers: append({text: 'New Answer', correct: false})})

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

const Component: React.StatelessComponent<State> = (state) => <form onSubmit={onSubmit(state)}>
   Question <br/>
   <input placeholder='Type question here' onChange={onQuestionChange} autoFocus/>
   <hr/>
   Answers
   &nbsp;
   <input type='button' value='Add' onClick={onAddAnswerButtonClick}/>
   <ul>{state.answers.map((answer, index) => <li key={index}>
      <input value={answer.text} onChange={onAnswerTextChange(index)}/>
      <input type='checkbox'
             checked={answer.correct}
             onChange={onAnswerCorrectChange(index)}/>
      <input type='button' value='X' onClick={onDeleteButtonClick(index)}/>
   </li>)}</ul>
   <hr/>
   {state.valid ? <h1>OK</h1> : <h1>Nope</h1>}
   <input type='submit' value='Create' disabled={!state.valid}/>
</form>

export const CreateAssessmentForm = store.connect(Component)
