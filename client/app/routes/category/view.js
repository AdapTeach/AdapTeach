import React from 'react'
import { Link }from 'react-router'
import { connect } from 'react-redux'

import categoryData from '../../core/data/category'
import ParentHierarchy from '../common/category-parent-hierarchy'

const ViewCategory = ({category}) =>
  <div>
    <h1>View Category</h1>
    <h3>
      <ParentHierarchy category={category}/>
      {category.name}
    </h3>
  </div>

const mapStateToProps = (state, props) => ({category: categoryData.get(props.params.id)})

const delayRenderUntilPropsLoaded = (props) => {
  if (!props.category)
    return <div>Loading category details...</div>
  return <ViewCategory {...props}/>
}

const ViewCategoryContainer = connect(mapStateToProps)(delayRenderUntilPropsLoaded);

export default ViewCategoryContainer
