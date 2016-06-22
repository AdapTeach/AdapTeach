import React from 'react'

import {compositeData} from 'domain-data'
import {connectWithLoader} from 'util'

const DisplayComposite = ({composite}) => (
  <div>
    <h1>View Composite</h1>
    <h2>{composite.name}</h2>
    <h3>{composite.description}</h3>
    <h2>Components</h2>
    <h4>Composites</h4>
    {composite.components.composites.map(component =>
      <div key={component.uuid}>{component.name}</div>
    )}
    <h4>Items</h4>
    {composite.components.items.map(component =>
      <div key={component.uuid}>{component.name}</div>
    )}
  </div>
)


const withProps = props => compositeData.find(props.params.id).map(composite => ({composite}))

export const component = connectWithLoader(withProps)(DisplayComposite)
