import * as React from 'react'
import {path} from '../../router/path'
import {router} from '../../router/router'

const goToCreateCategory = () => router.goTo(path.contribute.category.create)
const goToCreateItem = () => router.goTo(path.contribute.item.create)
const goToCreateComposite = () => router.goTo(path.contribute.composite.create)
const goToCreateAssessment = () => router.goTo(path.contribute.assessment.create)

export const ContributeNavigation: React.StatelessComponent<{}> = () =>
   <div style={{margin: '20px'}}>
      <button onClick={goToCreateCategory}>Create Category</button>
      <button onClick={goToCreateItem}>Create Item</button>
      <button onClick={goToCreateComposite}>Create Composite</button>
      <button onClick={goToCreateAssessment}>Create Assessment</button>
   </div>
