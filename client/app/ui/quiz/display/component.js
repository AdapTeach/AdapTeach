import React from 'react'
import {connectWithLoader} from 'util'

import {quizData} from 'domain-data'

const DisplayQuiz = ({quiz}) => (
  <div>
    <h1>Quiz</h1>
    <h2>{quiz.question}</h2>
  </div>
)

const withProps = props => quizData.find(props.params.id).map(quiz => ({quiz}))

export const component = connectWithLoader(withProps)(DisplayQuiz);

