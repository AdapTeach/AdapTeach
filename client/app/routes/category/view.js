import React from 'react'
import { Link }from 'react-router'
import { connect } from 'react-redux'

import categoryData from '../../core/data/category'

const ViewCategory = ({category}) =>
  <div>
    <h1>View Category</h1>
    <h3>
      <ParentHierarchy category={category}/>
      {category.name}
    </h3>
  </div>

const ParentHierarchy = ({category}) => {
  const parent = category.parent
  if (!parent) return <span></span>
  return <span>
    <ParentHierarchy category={parent}/>
    <Link to={`/category/${parent.uuid}`}>{parent.name}</Link> >
  </span>
}

const mapStateToProps = (state, props) => ({category: categoryData.get(props.params.id)})

const delayRenderUntilPropsLoaded = (props) => {
  if (!props.category)
    return <div>Loading category details...</div>
  return <ViewCategory {...props}/>
}

const ViewCategoryContainer = connect(mapStateToProps)(delayRenderUntilPropsLoaded);

export default ViewCategoryContainer
