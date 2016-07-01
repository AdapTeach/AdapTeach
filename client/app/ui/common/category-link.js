import React from 'react'
import {Link} from 'react-router'
import {path} from 'router'

export const CategoryLink = ({category}) =>
  <Link to={path.contribute.category.display(category.uuid)}>{category.name}</Link>
