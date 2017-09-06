import * as React from 'react'
import {RouteProps} from '../../../../router/RouteProps'
import {compositeEndpoint} from '../../../../endpoint/index'
import {connect} from 'react-rx-pure-connect'
import {CompositeDTO} from '../../../../core/domain/Composite'

const Component: React.StatelessComponent<CompositeDTO> = (composite) => <div>
   <h1>Display Composite</h1>
   <h3>Name: {composite.name}</h3>
   {composite.description && <div>Description: {composite.description}</div>}
   <div>Sub-objectives:
      {
         composite.subObjectives.length > 0 && <ul>{
            composite.subObjectives.map(o => <li key={o.uuid}>{o.name}</li>)
         }</ul>
      }
   </div>
</div>

const propsMapper = (props: RouteProps<{ uuid: string }>) => compositeEndpoint.get(props.match.params.uuid)

export const DisplayComposite = connect(Component).withMapper(propsMapper)
