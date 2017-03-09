import * as React from 'react'
import {itemEndpoint} from '../../../../endpoint/index'
import {RouteProps} from '../../../../router/RouteProps'
import {Item} from '../../../../core/domain/Item'
import {CategoryParentHierarchy} from '../../../common/CategoryParentHierarchy'
import {connect} from 'react-rx-pure-connect'

const Component: React.StatelessComponent<Item> = (item) => <div>
   <h1>View Item</h1>
   <h3>
      <CategoryParentHierarchy category={item.category}/>
      <div>{item.name}</div>
      <div>{item.description}</div>
   </h3>
</div>

const propsMapper = (props: RouteProps<{uuid: string}>) => itemEndpoint.get(props.match.params.uuid)

export const DisplayItem = connect(propsMapper)(Component)
