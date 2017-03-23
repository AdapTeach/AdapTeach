import {Entity} from './Entity'

export interface Objective extends Entity, ObjectiveFields {
}

export interface ObjectiveFields {
   name: string,
   description: string
}
