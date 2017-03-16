import {ObjectiveId} from './ObjectiveId'

export interface CompositeFields {
   name: string,
   description: string,
   subObjectives: ObjectiveId[]
}
