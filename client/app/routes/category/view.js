import React from 'react'
import { Link }from 'react-router'
import { connect } from 'react-redux'

import categoryData from '../../core/data/category'

const ViewCategory = (props) =>
  <div>
    <h1>View Category</h1>
    <h3>
      {props.category.parents.slice().reverse().map(parent =>
        <span key={parent.uuid}><Link to={`/category/${parent.uuid}`}>{parent.name}</Link> > </span>
      )}
      {props.category.name}
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
