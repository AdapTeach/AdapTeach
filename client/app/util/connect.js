import React from 'react'
import Rx from 'rxjs'

const wrapper = (propsMapper, wrappedComponent) => class extends React.Component {

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
    // if (this.internalProps)
      return wrappedComponent(this.internalProps)
    // else
    //   return <div>Loading...</div>
  }

}

export const connect = propsMapper => wrappedComponent => wrapper(propsMapper, wrappedComponent)
