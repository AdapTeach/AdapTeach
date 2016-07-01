import React from 'react'
import Rx from 'rxjs'

const wrapper = (propsMapper, WrappedComponent) => class extends React.Component {

  componentWillMount() {
    this.props$ = new Rx.BehaviorSubject(this.props)
    const internalProps$ = this.props$.mergeMap(propsMapper)
    this.subscriber = internalProps$.subscribe(internalProps => {
      this.internalProps = internalProps
      this.forceUpdate()
    })
  }

  componentWillReceiveProps(nextProps) {
    this.props$.next(nextProps)
  }

  componentWillUnmount() {
    this.subscriber.unsubscribe()
  }

  render() {
    if (this.internalProps)
      return <WrappedComponent {...this.internalProps}></WrappedComponent>
    else
      return <div>Loading...</div>
  }

}

export const connect = propsMapper => wrappedComponent => wrapper(propsMapper, wrappedComponent)

const wrapWithLoader = WrappedComponent => props => props
  ? <WrappedComponent {...props}></WrappedComponent>
  : <div>Loading... (fancy loader gif here)</div>

export const connectWithLoader = propsMapper => wrappedComponent => wrapper(propsMapper, wrapWithLoader(wrappedComponent))
