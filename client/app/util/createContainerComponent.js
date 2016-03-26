import {connect} from 'react-redux'

const propsBuilder = (getState, actions) =>
  () => ({...getState(), actions})

export const createContainerComponent = (presentationComponent, getState, actions) =>
  connect(propsBuilder(getState, actions))(presentationComponent)
