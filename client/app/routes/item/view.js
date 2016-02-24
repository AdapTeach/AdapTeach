import React from 'react'
import { connect } from 'react-redux'

import itemData from '../../core/data/item'
import categoryData from '../../core/data/category'
import CategoryParentHierarchy from '../common/category-parent-hierarchy'
import CategoryLink from '../common/category-link'

const ViewItem = ({item}) => (
  <div>
    <h1>View Item</h1>
    <h2>{item.name}</h2>
    <h3>
      <CategoryParentHierarchy category={item.category}/>
      <CategoryLink category={item.category}/>
    </h3>
    <h4>{item.description}</h4>
  </div>
)

const mapStateToProps = (state, props) => ({item: itemData.get(props.params.id)})

const delayRenderUntilPropsLoaded = (props) => {
  if (!props.item)
    return <div>Loading item details...</div>
  return <ViewItem {...props}/>
}

const ViewItemContainer = connect(mapStateToProps)(delayRenderUntilPropsLoaded);

export default ViewItemContainer
