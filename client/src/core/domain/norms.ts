import {normalize, schema} from 'normalizr'
import {RichItem} from './RichItem'
import {RichCategory} from './RichCategory'

const categorySchema = new schema.Entity('category', {}, {idAttribute: 'uuid'})
categorySchema.define({parent: categorySchema})

const itemSchema = new schema.Entity('item', {
   category: categorySchema
}, {idAttribute: 'uuid'})

export const normalizeCategory = (richCategory: RichCategory) => normalize(richCategory, categorySchema)

export const normalizeItem = (richItem: RichItem) => normalize(richItem, itemSchema)

