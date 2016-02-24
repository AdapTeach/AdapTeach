import React from 'react'
import { Link }from 'react-router'

const CategoryLink = ({category}) => <Link to={`/category/${category.uuid}`}>{category.name}</Link>

export default CategoryLink
