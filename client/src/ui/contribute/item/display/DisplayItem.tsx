import * as React from 'react'
import {connect} from '../../../../util/connect'
import {itemEndpoint} from '../../../../endpoint/index'
import {RouteProps} from '../../../../router/RouteProps'
import {Item} from '../../../../core/domain/Item'

const Component: React.StatelessComponent<Item> = (item) => <div>
   <h1>View Item</h1>
   <h3>
      {/*<CategoryParentHierarchy category={category}/>*/}
      {item.name}
      {item.categoryId}
   </h3>
</div>

const propsMapper = (props: RouteProps<{uuid: string}>) => itemEndpoint.get(props.match.params.uuid)

export const DisplayItem = connect(propsMapper)(Component)
