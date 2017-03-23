import {normalize, schema} from 'normalizr'
import {CategoryDTO} from './Category'
import {ItemDTO} from './Item'
import {CompositeDTO} from './Composite'

const categorySchema = new schema.Entity('category', {}, {idAttribute: 'uuid'})
categorySchema.define({parent: categorySchema})

const itemSchema = new schema.Entity('item', {
   category: categorySchema
}, {idAttribute: 'uuid'})

// const objectiveSchema = new schema.Entity()

const compositeSchema = new schema.Entity('composite', {
})

export const normalizeCategory = (dto: CategoryDTO) => normalize(dto, categorySchema)

export const normalizeItem = (dto: ItemDTO) => normalize(dto, itemSchema)

export const normalizeComposite = (dto: CompositeDTO) => normalize(dto, compositeSchema)

