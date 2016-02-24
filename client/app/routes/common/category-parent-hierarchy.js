import React from 'react'
import CategoryLink from './category-link'

const CategoryParentHierarchy = ({category}) => {
  const parent = category.parent
  if (!parent) return <span></span>
  return <span>
    <CategoryParentHierarchy category={parent}/>
    <CategoryLink category={parent}/> > </span>
}

export default CategoryParentHierarchy
