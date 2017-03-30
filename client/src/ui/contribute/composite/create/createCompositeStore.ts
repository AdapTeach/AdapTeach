import {Store} from 'sparix'
import {Observable} from 'rxjs'
import {concat, contains, merge} from 'ramda'
import {Objective} from '../../../../core/domain/Objective'

interface State {
   name: string
   description: string
   subObjectives: Objective[]
   isAddingSubObjective: boolean
   searchedSubObjectiveName: string
   subObjectiveSuggestions: Objective[]
}

class CreateCompositeStore extends Store<State> {

   constructor() {
      super({
         name: '',
         description: '',
         subObjectives: [],
         isAddingSubObjective: true,
         searchedSubObjectiveName: '',
         subObjectiveSuggestions: []
      })
   }

   setName(name: string) {
      this.updateState({name})
   }

   setDescription(description: string) {
      this.updateState({description})
   }

   setSearchedSubObjectiveName(searchedSubObjectiveName: string) {
      this.updateState({searchedSubObjectiveName})
   }

   setIsAddingSubObjective() {
      this.updateState({isAddingSubObjective: true})
   }

   setSubObjectiveSuggestions(subObjectiveSuggestions: Objective[]) {
      this.update(state => ({
         subObjectiveSuggestions: subObjectiveSuggestions.filter(suggestion => !contains(suggestion, state.subObjectives))
      }))
   }

   addSubObjective(objective: Objective) {
      this.updateState({
         isAddingSubObjective: false,
         searchedSubObjectiveName: '',
         subObjectives: concat([objective])
      })
   }
}

export const createCompositeStore = new CreateCompositeStore()

export interface CreateCompositeState extends State {
   canSubmit: boolean
}

export const createCompositeState$: Observable<CreateCompositeState> = createCompositeStore
   .map(state => merge(state, {
      canSubmit: Boolean(state.name.length > 1 && state.subObjectives.length)
   }))
