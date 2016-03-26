import React from 'react'
import { connect } from 'react-redux'

import {compositeRepo} from 'domain-data'

const ViewComposite = ({composite}) => (
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

const buildProps = (state, props) => ({composite: compositeRepo.find(props.params.id)})

const delayRenderUntilPropsLoaded = (props) => {
  if (!props.composite)
    return <div>Loading composite details...</div>
  return <ViewComposite {...props}/>
}

export const component = connect(buildProps)(delayRenderUntilPropsLoaded);
