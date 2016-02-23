import React from 'react'
import { Link }from 'react-router'
import { connect } from 'react-redux'

import itemData from '../../core/data/item'
import categoryData from '../../core/data/category'

const ViewItem = (props) => (
  <div>
    <h1>View Item</h1>
    <h2>{props.item.name}</h2>
    <h3>
      {props.category.parents.slice().reverse().map(parent =>
        <span key={parent.uuid}><Link to={`/category/${parent.uuid}`}>{parent.name}</Link> > </span>
      )}
      <Link to={`/category/${props.category.uuid}`}>{props.category.name}</Link>
    </h3>
    <h4>{props.item.description}</h4>
  </div>
)

const mapStateToProps = (state, props) => {
  var item, category
  item = itemData.get(props.params.id)
  if (item) category = categoryData.get(item.categoryId)
  return {item, category}
}

const delayRenderUntilPropsLoaded = (props) => {
  if (!props.item || !props.category)
    return <div>Loading item details...</div>
  return <ViewItem {...props}/>
}

const ViewItemContainer = connect(mapStateToProps)(delayRenderUntilPropsLoaded);

export default ViewItemContainer
