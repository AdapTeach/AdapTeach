import * as React from 'react'
import {CategoryParentHierarchy} from '../../../common/CategoryParentHierarchy'
import {Category} from '../../../../core/domain/Category'
import {categoryEndpoint} from '../../../../endpoint/index'
import {RouteProps} from '../../../../router/RouteProps'
import {connect} from 'react-rx-pure-connect'

const Component: React.StatelessComponent<Category> = (category) => <div>
   <h1>View Category</h1>
   <h3>
      <CategoryParentHierarchy category={category.uuid}/>
   </h3>
</div>

const propsMapper = (props: RouteProps<{uuid: string}>) => categoryEndpoint.get(props.match.params.uuid)

export const DisplayCategory = connect(propsMapper)(Component)
