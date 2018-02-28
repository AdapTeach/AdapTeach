import * as React from 'react'
import { CategoryParentHierarchy } from '../../../../widgets/common/CategoryParentHierarchy'
import { Category } from '../../../../core/domain/Category'
import { categoryEndpoint, assessmentEndpoint } from '../../../../endpoint/index'
import { RouteProps } from '../../../../router/RouteProps'
import { connect } from 'react-rx-pure-connect'
import { Assessment } from '../../../../core/domain/Assessment'

const Component: React.StatelessComponent<Assessment> = (assessment) => <div>
   <h1>View Assessment</h1>
   <div>
      {JSON.stringify(assessment)}
   </div>
</div>

const propsMapper = (props: RouteProps<{ uuid: string }>) => assessmentEndpoint.get(props.match.params.uuid)

export const DisplayAssessment = connect(Component).withMapper(propsMapper)
