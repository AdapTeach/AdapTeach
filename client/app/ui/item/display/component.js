import React from 'react'
import {connect} from 'react-redux'

import {itemRepo, categoryRepo} from 'domain-data'
import {CategoryParentHierarchy, CategoryLink} from 'components'

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

const buildProps = (state, props) => ({
  item: itemRepo.find(props.params.id)
})

const delayRenderUntilPropsLoaded = (props) => {
  if (!props.item)
    return <div>Loading item details...</div>
  return <ViewItem {...props}/>
}

export const component = connect(buildProps)(delayRenderUntilPropsLoaded);

