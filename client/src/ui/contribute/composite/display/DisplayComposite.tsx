import * as React from 'react'
import {RouteProps} from '../../../../router/RouteProps'
import {compositeEndpoint} from '../../../../endpoint/index'
import {connect} from 'react-rx-pure-connect'


const Component: React.StatelessComponent<any> = (composite) => <div>
   <h1>View Composite</h1>
   <h3>Name: {composite.name}</h3>
   {JSON.stringify(composite)}
   {composite.description && <div>Description: {composite.description}</div>}
   <div>Sub-objectives:
      {
         composite.components.composites.length > 0 && <div>
            Composites:
            <ul>{
               composite.components.composites.map(o => <li key={o.uuid}>{o.name}</li>)
            }</ul>
         </div>
      }
      {
         composite.components.items.length > 0 && <div>
            Items:
            <ul>{
               composite.components.items.map(o => <li key={o.uuid}>{o.name}</li>)
            }</ul>
         </div>
      }
   </div>
</div>

const propsMapper = (props: RouteProps<{uuid: string}>) => compositeEndpoint.get(props.match.params.uuid)

export const DisplayComposite = connect(propsMapper)(Component)
