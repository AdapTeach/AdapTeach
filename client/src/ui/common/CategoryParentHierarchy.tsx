import * as React from 'react'
import {CategoryLink} from './CategoryLink'
import {Category} from '../../core/domain/Category'
import {categoryEndpoint} from '../../endpoint/index'
import {connect} from 'react-rx-pure-connect'

const HierarchyComponent: React.StatelessComponent<Category> = (category) => {
   const {parent} = category
   if (!parent) return null
   return <span>
      <ParentHierarchy category={parent}/>
      <CategoryLink category={parent}/> > </span>
}

const propsMapper = (props: { category: string }) => categoryEndpoint.get(props.category)

const ParentHierarchy = connect(HierarchyComponent).withMapper(propsMapper)

const Component: React.StatelessComponent<Category> = (category) => <span>
   <ParentHierarchy category={category.uuid}/>
   {category.name}
</span>

export const CategoryParentHierarchy = connect(Component).withMapper(propsMapper)
