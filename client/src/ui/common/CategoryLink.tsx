import * as React from 'react'
import {Link} from 'react-router-dom'
import {path} from '../../router/path'
import {Category} from '../../core/domain/Category'
import {categoryEndpoint} from '../../endpoint/index'
import {connect} from '../../util/connect'

const Component: React.StatelessComponent<Category> = (category) =>
   <Link to={path.contribute.category.display(category.uuid)}>{category.name}</Link>

const propsMapper = (props: {category: string}) => categoryEndpoint.get(props.category)

export const CategoryLink = connect(propsMapper)(Component)
