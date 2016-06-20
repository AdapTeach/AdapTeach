import React from 'react'

import {categoryData} from 'domain-data'
import {CategoryParentHierarchy} from 'components'
import {connect} from 'util'

const DisplayCategory = ({category}) =>
  <div>
    <h1>View Category</h1>
    <h3>
      <CategoryParentHierarchy category={category}/>
      {category.name}
    </h3>
  </div>

const delayRenderUntilPropsLoaded = props => props
  ? <DisplayCategory {...props}/>
  : <div>Loading category details...</div>

const withProps = props => categoryData.find(props.params.id).map(category => ({category}))

export const component = connect(withProps)(delayRenderUntilPropsLoaded)
