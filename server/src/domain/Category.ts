import {Entity} from './Entity'

export interface Category extends Entity {
   name: string,
   parent?: Category
}

export interface CategoryFields {
   name: string,
   parent?: string
}
