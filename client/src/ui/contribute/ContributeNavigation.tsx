import * as React from 'react'
import {path} from '../../router/path'
import {router} from '../../router/router'

const goToCreateCategory = () => router.goTo(path.contribute.category.create)
const goToCreateItem = () => router.goTo(path.contribute.item.create)
const goToCreateComposite = () => router.goTo(path.contribute.composite.create)
const goToCreateQuiz = () => router.goTo(path.contribute.quiz.create)

export const ContributeNavigation: React.StatelessComponent<{}> = () =>
   <div>
      <button onClick={goToCreateCategory}>Create Category</button>
      <button onClick={goToCreateItem}>Create Item</button>
      <button onClick={goToCreateComposite}>Create Composite</button>
      <button onClick={goToCreateQuiz}>Create Quiz</button>
   </div>
