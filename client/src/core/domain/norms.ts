import {normalize, schema} from 'normalizr'
import {RichItem} from './RichItem'

const category = new schema.Entity('category', {}, {idAttribute: 'uuid'})
category.define({parent: category})

const itemSchema = new schema.Entity('item', {category}, {idAttribute: 'uuid'})

export const normalizeItem = (richItem: RichItem) => normalize(richItem, itemSchema)
