import {Entity} from './Entity'

export type ObjectiveType = 'Item' | 'Composite'
export const ITEM: ObjectiveType = 'Item'
export const COMPOSITE: ObjectiveType = 'Composite'

export interface Objective extends Entity, ObjectiveFields {
   type: ObjectiveType
}

export interface ObjectiveFields {
   name: string
   description: string
}
