import * as React from 'react'
import recycle from 'recycle'
import {contains} from 'ramda'
import {Item} from '../../core/domain/Item'
import {itemEndpoint} from '../../endpoint/index'
import {UUID} from '../../core/domain/UUID'

type Props = {
   suggestionsToReject: UUID[]
   onSelect: (uuid: UUID) => void
}

type State = {
   query: string
   suggestions: Item[]
}

const initialState: State = {
   query: '',
   suggestions: []
}

const view = (props: Props, state: State) => <div>
   <input placeholder='Search Item by name' value={state.query}/>
   <ul>{state.suggestions.map(suggestion => <li key={suggestion.uuid} data-uuid={suggestion.uuid}>
      {suggestion.name}
   </li>)}</ul>
</div>

const update = (sources) => {
   const query$ = sources
      .select('input')
      .addListener('onChange')
      .map(e => e.target.value)
   const suggestions$ = query$
      .switchMap(query => itemEndpoint.search(query))
      .withLatestFrom(sources.props)
      .map(([suggestions, props]) => suggestions.filter(suggestion => !contains(suggestion.uuid, props.suggestionsToReject)))
   return [
      query$.reducer((state, query) => ({...state, query})),
      suggestions$.reducer((state, suggestions) => ({...state, suggestions}))
   ]
}

const effects = (sources) => {
   const selectedSuggestion$ = sources.select('li')
      .addListener('onClick')
      .map(e => e.target.dataset.uuid)
   return [
      selectedSuggestion$
         .withLatestFrom(sources.props)
         .map(([uuid, props]) => props.onSelect(uuid))
   ]
}

export const ItemSearch = recycle({
   initialState,
   view,
   update,
   effects
})
