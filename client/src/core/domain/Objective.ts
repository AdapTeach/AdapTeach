import {Entity} from './Entity'

export type ObjectiveType = 'ITEM' | 'COMPOSITE'
export const ITEM: ObjectiveType = 'ITEM'
export const COMPOSITE: ObjectiveType = 'COMPOSITE'

export interface Objective extends Entity, ObjectiveFields {
   type: ObjectiveType
}

export interface ObjectiveFields {
   name: string
   description: string
}

export interface ObjectiveDTO extends Objective {
}
