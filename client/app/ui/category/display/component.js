import React from 'react'
import {connect} from 'react-redux'

import {categoryRepo} from 'domain-data'
import {CategoryParentHierarchy} from 'components'

const DisplayCategory = ({category}) =>
  <div>
    <h1>View Category</h1>
    <h3>
      <CategoryParentHierarchy category={category}/>
      {category.name}
    </h3>
  </div>

const mapStateToProps = (state, props) => ({category: categoryRepo.find(props.params.id)})

const delayRenderUntilPropsLoaded = (props) => props.category
  ? <DisplayCategory {...props}/>
  : <div>Loading category details...</div>

export const component = connect(mapStateToProps)(delayRenderUntilPropsLoaded)
