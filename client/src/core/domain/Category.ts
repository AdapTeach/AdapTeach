import {UUID} from './UUID'

export interface Category {
   uuid?: UUID,
   name: string,
   parent?: string
}
