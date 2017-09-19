import {Subject} from 'rxjs'
import {concat, not, isNil, compose} from 'ramda'
import {createCompositeStore} from './createCompositeStore'
import {objectiveEndpoint} from '../../../../endpoint/index'
import {Objective} from '../../../../core/domain/Objective'

export const searchedSubObjectiveNameChangedEpic = new Subject<string>()

searchedSubObjectiveNameChangedEpic
   .filter(compose(not, isNil))
   .do(name => createCompositeStore.setSearchedSubObjectiveName(name))
   .filter(name => name.length > 1)
   .switchMap(name => objectiveEndpoint.searchByName(name))
   .map(({composites, items}) => concat<Objective>(composites, items))
   .subscribe(suggestions => createCompositeStore.setSubObjectiveSuggestions(suggestions))
