import React from 'react'
import { connect } from 'react-redux'

import compositeData from '../../core/data/composite'

const ViewComposite = ({composite}) => (
  <div>
    <h1>View Composite</h1>
    <h2>{composite.name}</h2>
    <h4>{composite.description}</h4>
    {composite.objectives.map(objective => <div key={objective.uuid}>{objective.name}</div>)}
  </div>
)

const mapStateToProps = (state, props) => ({composite: compositeData.get(props.params.id)})

const delayRenderUntilPropsLoaded = (props) => {
  if (!props.composite)
    return <div>Loading composite details...</div>
  return <ViewComposite {...props}/>
}

const ViewItemContainer = connect(mapStateToProps)(delayRenderUntilPropsLoaded);

export default ViewItemContainer
