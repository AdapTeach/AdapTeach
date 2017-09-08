import * as React from 'react'
import {DiffProvider, PartialDiff, Store} from 'sparix'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/switchMap'
import {connect} from 'react-rx-pure-connect'

export class FormStore<State> extends Store<State> {

   constructor(initialState: State) {
      super(initialState)
   }

   update(updater: DiffProvider<State>) {
      super.update(updater)
   }

   updateState(diff: PartialDiff<State>) {
      super.updateState(diff)
   }

   connect<Props>(Component: React.StatelessComponent<{ props: Props, state: State }>) {
      return connect(Component).withMapper((externalProps: Props) => this.map(state => ({
         props: externalProps,
         state
      })), {componentWillUnmount: () => this.resetState()})
   }

}
