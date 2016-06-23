import React from 'react'
import {router, path} from 'router'

export class Navigation extends React.Component {

  render() {
    return <div>
      <button onClick={::this.goToCreateCategory}>Create Category</button>
      <button onClick={::this.goToCreateItem}>Create Item</button>
      <button onClick={::this.goToCreateComposite}>Create Composite</button>
      <button onClick={::this.goToCreateQuiz}>Create Quiz</button>
    </div>
  }

  goToCreateCategory() {
    router.goTo(path.category.create);
  }

  goToCreateItem() {
    router.goTo(path.item.create);
  }

  goToCreateComposite() {
    router.goTo(path.composite.create);
  }

  goToCreateQuiz() {
    router.goTo(path.quiz.create);
  }

}
