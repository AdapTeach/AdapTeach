import {Entity} from './Entity'

export interface Category extends Entity, CategoryFields {
}

export interface CategoryFields {
   name: string,
   parent?: string
}

export interface CategoryDTO extends Entity {
   name: string,
   parent?: CategoryDTO
}

