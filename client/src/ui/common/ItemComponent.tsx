import * as React from 'react'
import {connect} from 'react-rx-pure-connect'
import {UUID} from '../../core/domain/UUID'
import {itemEndpoint} from '../../endpoint/index'
import {Item} from '../../core/domain/Item'

const Component: React.StatelessComponent<Item> = (item) => <span>{item.name}</span>

export const ItemComponent = connect(Component).withMapper((externalProps: { id: UUID }) => itemEndpoint.get(externalProps.id))
