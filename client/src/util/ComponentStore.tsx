import * as React from 'react'
import {DiffProvider, PartialDiff, Store} from 'sparix'
import 'rxjs/add/operator/distinctUntilChanged'
import 'rxjs/add/operator/switchMap'
import {connectTo} from 'react-rx-pure-connect'

export class ComponentStore<State> extends Store<State> {

   constructor(initialState: State) {
      super(initialState)
   }

   update(updater: DiffProvider<State>) {
      super.update(updater)
   }

   updateState(diff: PartialDiff<State>) {
      super.updateState(diff)
   }

   connect(Component: React.StatelessComponent<State>) {
      return connectTo(this.state$, Component, {onWillUnmount: () => this.resetState()})
   }

   static create<State extends object>(initialState: State) {
      class DynamicComponentStore extends ComponentStore<State> {
      }
      return new DynamicComponentStore(initialState)
   }

}
