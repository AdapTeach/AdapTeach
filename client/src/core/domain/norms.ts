import {normalize, schema} from 'normalizr'
import {CategoryDTO} from './Category'
import {ItemDTO} from './Item'

const categorySchema = new schema.Entity('category', {}, {idAttribute: 'uuid'})
categorySchema.define({parent: categorySchema})

const itemSchema = new schema.Entity('item', {
   category: categorySchema
}, {idAttribute: 'uuid'})

export const normalizeCategory = (dto: CategoryDTO) => normalize(dto, categorySchema)

export const normalizeItem = (dto: ItemDTO) => normalize(dto, itemSchema)

