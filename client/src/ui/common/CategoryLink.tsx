import * as React from 'react'
import {path} from '../../router/path'
import {Category} from '../../core/domain/Category'
import {categoryEndpoint} from '../../endpoint/index'
import {connect} from 'react-rx-pure-connect'
import {Link} from './Link'

const Component: React.StatelessComponent<Category> = (category) =>
   <Link path={path.contribute.category.display(category.uuid)}>{category.name}</Link>

const propsMapper = (props: {category: string}) => categoryEndpoint.get(props.category)

export const CategoryLink = connect(propsMapper)(Component)
