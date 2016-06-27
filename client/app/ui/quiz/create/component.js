import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import {router, path} from 'router'
import {quizData} from 'domain-data'
import {ObjectiveSearchDialog} from 'components'

class CreateQuiz extends React.Component {

  state = {
    assessedItems: [],
    prerequisites: [],
    question: '',
    answers: []
  }

  render() {
    return (
      <div>
        <h2>Create Quiz</h2>
        <form>
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
          <TextField onChange={::this.onQuestionChange} hintText="Question"/>
          <br/>
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

  onQuestionChange(ev) {
    this.setState({question: ev.target.value})
  }

  create(e) {
    e.preventDefault()
    quizData.create({
      question: this.state.question,
      assessedItemIds: this.state.assessedItems.map(i => i.uuid),
      prerequisiteIds: this.state.prerequisites.map(p => p.uuid)
    })
      .then(created => router.goTo(path.quiz.display(created.uuid)))
      .catch(::console.error)
  }

}

export const component = CreateQuiz
