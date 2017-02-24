import * as React from 'react'
import {CategoryLink} from './CategoryLink'
import {Category} from '../../core/domain/Category'

interface Props {
   category: Category
}

export const CategoryParentHierarchy: React.StatelessComponent<Props> = ({category}) => {
   const {parent} = category
   if (!parent) return null
   return <span>
      <CategoryParentHierarchy category={parent}/>
   <CategoryLink category={parent}/> > </span>
}
