import * as React from 'react'
import {contains} from 'ramda'
import {createFormStore} from '../../util/createFormStore'
import {objectiveEndpoint} from '../../endpoint/index'
import {Objective} from '../../core/domain/Objective'
import {UUID} from '../../core/domain/UUID'

type Props = {
   visible: boolean
   rejectedSuggestions: UUID[]
   onSelect: (selectedObjective: Objective) => void
}

type State = {
   query: string
   suggestions: Objective[]
}

const initialState: State = {
   query: '',
   suggestions: []
}

const store = createFormStore(initialState)

const onSuggestionSelected = (suggestion: Objective, props: Props) => () => {
   props.onSelect(suggestion)
   store.resetState()
}

const Component: React.StatelessComponent<{ props: Props, state: State }> = ({props, state}) =>
   <div hidden={!props.visible}>
      <input placeholder='Search Objective by name'
             value={state.query}
             onChange={(e) => store.updateState({query: e.target.value})}/>
      <ul>{state.suggestions
         .filter(suggestion => !contains(suggestion.uuid, props.rejectedSuggestions))
         .map(suggestion =>
            <li key={suggestion.uuid} onClick={onSuggestionSelected(suggestion, props)}>{suggestion.name}</li>)}
      </ul>
   </div>


export const ObjectiveSearch = store.connect(Component)

store.select('query')
   .filter(query => query.length > 2)
   .switchMap(query => objectiveEndpoint.searchByName(query))
   .map(result => [
      ...result.composites,
      ...result.items
   ])
   .subscribe(suggestions => store.updateState({suggestions}))
