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
          <ObjectiveSearchDialog filter='items' onSelect={::this.onItemAdd}></ObjectiveSearchDialog>
          <label>Assessed Items</label>
          <br/>
          {this.state.assessedItems.map(i =>
            <div key={i.uuid}>{i.name}</div>
          )}
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

  onQuestionChange(ev) {
    this.setState({question: ev.target.value})
  }

  create() {
    quizData.create({
      question: this.state.question,
    })
      .then(created => router.goTo(path.quiz.display(created.uuid)))
      .catch(::console.error)
  }

}

export const component = CreateQuiz
