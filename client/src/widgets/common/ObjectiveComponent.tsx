import * as React from 'react'
import {Objective} from '../../core/domain/Objective'
import {connect} from 'react-rx-pure-connect'
import {UUID} from '../../core/domain/UUID'
import {objectiveEndpoint} from '../../endpoint/index'

const Component: React.StatelessComponent<Objective> = (objective) => <span>{objective.name}</span>

export const ObjectiveComponent = connect(Component).withMapper((externalProps: { id: UUID }) => objectiveEndpoint.get(externalProps.id))
