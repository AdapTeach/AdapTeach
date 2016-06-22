import React from 'react'
import {connectWithLoader} from 'util'

import {itemData} from 'domain-data'
import {CategoryParentHierarchy, CategoryLink} from 'components'

const DisplayItem = ({item}) => (
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

const withProps = props => itemData.find(props.params.id).map(item => ({item}))

export const component = connectWithLoader(withProps)(DisplayItem);

