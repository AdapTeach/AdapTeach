import * as React from 'react'
import {CategoryLink} from './category-link'

export const CategoryParentHierarchy = ({category}) => {
   const {parent} = category
   if (!parent) return null
   return <span>
      <CategoryParentHierarchy category={parent}/>
   <CategoryLink category={parent}/> > </span>
}
