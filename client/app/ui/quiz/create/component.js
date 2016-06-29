import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import ContentRemove from 'material-ui/svg-icons/content/remove'

import {router, path} from 'router'
import {quizData} from 'domain-data'
import {ObjectiveSearchDialog} from 'components'

class CreateQuiz extends React.Component {

  state = {
    assessedItems: [],
    prerequisites: [],
    activelyRecalledItems: [],
    passivelyRecalledItems: [],
    question: '',
    code: [], // {filename: 'index.js', language: 'js', code: 'console.log("Hello, World!")'}
    answers: [
      {text: '', correct: true},
      {text: '', correct: false}
    ]
  }

  render() {
    return (
      <div>
        <h2>Create Quiz</h2>
        <form onSubmit={::this.create}>
          <label>Assessed Items</label>
          <ObjectiveSearchDialog filter='items' onSelect={::this.onItemAdd}></ObjectiveSearchDialog>
          {this.state.assessedItems.map(i =>
            <div key={i.uuid}>{i.name}</div>
          )}
          <br/>
          <label>Prerequisites</label>
          <ObjectiveSearchDialog onSelect={::this.onPrerequisiteAdd}></ObjectiveSearchDialog>
          {this.state.prerequisites.map(p =>
            <div key={p.uuid}>{p.name}</div>
          )}
          <br/>
          <label>Actively recalled Items</label>
          <ObjectiveSearchDialog filter='items' onSelect={::this.onActivelyRecalledItemAdd}></ObjectiveSearchDialog>
          {this.state.activelyRecalledItems.map(i =>
            <div key={i.uuid}>{i.name}</div>
          )}
          <br/>
          <label>Passively recalled Items</label>
          <ObjectiveSearchDialog filter='items' onSelect={::this.onPassivelyRecalledItemAdd}></ObjectiveSearchDialog>
          {this.state.passivelyRecalledItems.map(i =>
            <div key={i.uuid}>{i.name}</div>
          )}
          <br/>
          <TextField onChange={::this.onQuestionChange} hintText="Question"/>
          <br/>
          <FlatButton onClick={::this.addAnswer}>Add Answer</FlatButton>
          {
            this.state.answers.map((answer, index) => (
              <div key={index}>
                <TextField onChange={::this.onAnswerTextChange(index)} hintText={'Answer ' + (index+1)}/>
                <input type="checkbox" onChange={::this.toggleCorrect(index)} checked={answer.correct}/>
                <FlatButton onClick={::this.removeAnswer(index)}><ContentRemove /></FlatButton>
              </div>
            ))
          }
          <br />
          <RaisedButton onClick={::this.create} primary label="Create"/>
        </form>
      </div>
    )
  }

  onItemAdd(item) {
    this.setState({
      assessedItems: [
        ...this.state.assessedItems,
        item
      ]
    })
  }

  onPrerequisiteAdd(prerequisite) {
    this.setState({
      prerequisites: [
        ...this.state.prerequisites,
        prerequisite
      ]
    })
  }

  onActivelyRecalledItemAdd(item) {
    this.setState({
      activelyRecalledItems: [
        ...this.state.activelyRecalledItems,
        item
      ]
    })
  }

  onPassivelyRecalledItemAdd(item) {
    this.setState({
      passivelyRecalledItems: [
        ...this.state.passivelyRecalledItems,
        item
      ]
    })
  }

  onQuestionChange(ev) {
    this.setState({question: ev.target.value})
  }

  onAnswerTextChange(index) {
    return ev => {
      const answers = this.state.answers
      answers[index].text = ev.target.value
      this.setState({answers})
    }
  }

  addAnswer() {
    this.setState({
      answers: [
        ...this.state.answers,
        {text: '', correct: false}
      ]
    })
  }

  toggleCorrect(index) {
    return () => {
      const answers = this.state.answers
      answers[index].correct = !answers[index].correct
      this.setState({answers})
    }
  }

  removeAnswer(index) {
    return () => {
      const answers = this.state.answers
      answers.splice(index, 1)
      this.setState({answers})
    }
  }

  create(e) {
    e.preventDefault()
    quizData.create({
      question: this.state.question,
      assessedItemIds: this.state.assessedItems.map(i => i.uuid),
      prerequisiteIds: this.state.prerequisites.map(p => p.uuid),
      activelyRecalledItemIds: this.state.activelyRecalledItems.map(i => i.uuid),
      passivelyRecalledItemIds: this.state.passivelyRecalledItems.map(i => i.uuid),
      answers: this.state.answers
    })
      .then(created => router.goTo(path.quiz.display(created.uuid)))
      .catch(::console.error)
  }

}

export const component = CreateQuiz
