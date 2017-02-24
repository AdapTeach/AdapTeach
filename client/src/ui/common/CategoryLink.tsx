import * as React from 'react'
import {Link} from 'react-router-dom'
import {path} from '../../router/path'
import {Category} from '../../core/domain/Category'

export const CategoryLink: React.StatelessComponent<{category: Category}> = ({category}) =>
   <Link to={path.contribute.category.display(category.uuid)}>{category.name}</Link>
