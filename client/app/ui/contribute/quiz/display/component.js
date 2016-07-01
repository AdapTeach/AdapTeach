import React from 'react'
import {connectWithLoader} from 'util'

import {quizData} from 'domain-data'

const DisplayQuiz = ({quiz}) => (
  <div>
    <h1>Quiz</h1>
    <h3>Assessed Items :</h3>
    {quiz.assessedItems.map((item, index) =>
      <div key={index}>{item.name}</div>)
    }
    <h3>Prerequisites :</h3>
    {quiz.prerequisites.map((preq, index) =>
      <div key={index}>{preq.name}</div>)
    }
    <h3>Actively recalled Items :</h3>
    {quiz.activelyRecalledItems.map((actively, index) =>
      <div key={index}>{actively.name}</div>)
    }
    <h3>Passively recalled Items :</h3>
    {quiz.passivelyRecalledItems.map((passively, index) =>
      <div key={index}>{passively.name}</div>)
    }
    <h2>Question : {quiz.question}</h2>
    <h2>Answers :</h2>
    {quiz.answers.map((answer, index) =>
      <h3 key={index}>{answer.text} { answer.correct ? 'Correct' : '' }</h3>
    )}
  </div>
)

const withProps = props => quizData.find(props.params.id).map(quiz => ({quiz}))

export const component = connectWithLoader(withProps)(DisplayQuiz);

