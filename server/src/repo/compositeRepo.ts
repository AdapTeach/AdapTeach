import * as uuid from 'uuid'
import {InvalidArgumentError} from '../error/InvalidArgumentError'
import {cypher} from './graph/cypher'
import {CompositeFields} from '../domain/CompositeFields'

function compositeFromRecord(record) {
   const composite = record.get('c').properties
   const itemNodes = record.keys.indexOf('items') >= 0 ? record.get('items') : []
   const categoryNodes = record.keys.indexOf('categories') >= 0 ? record.get('categories') : []
   const items = itemNodes.map(node => node.properties)
   const categories = categoryNodes.map(node => node.properties)
   addCategoriesToItems(items, categories)
   const composites = record.keys.indexOf('composites') >= 0 ? record.get('composites') : []
   composite.components = {items, composites}
   return composite
}

function addCategoriesToItems(items, categories) {
   items.forEach((item, index) => item.category = categories[index])
   return items
}

const create = async(compositeFields: CompositeFields) => {
   if (!compositeFields.name) throw new InvalidArgumentError('Name is missing on Composite to create')
   // The second, long query will not return created Composite if the subObjectives array is empty
   let statement = `
    CREATE (c:Composite:Objective {uuid: {uuid}, name: {name}, description: {description}})
    RETURN c`
   if (compositeFields.subObjectives && compositeFields.subObjectives.length > 0) statement = `
    CREATE (c:Composite:Objective {uuid: {uuid}, name: {name}, description: {description}})
    WITH c
    UNWIND {subObjectives} AS componentId
      MATCH (o:Objective {uuid: componentId})
      CREATE (c) -[:COMPOSED_OF]-> (o)
    WITH c
    OPTIONAL MATCH (c) -[:COMPOSED_OF]-> (item:Item) -[:IN_CATEGORY]-> (category:Category)
    OPTIONAL MATCH (c) -[:COMPOSED_OF]-> (composite:Composite)
    RETURN c, collect(DISTINCT item) as items, collect(DISTINCT category) as categories, collect(composite) as composites`
   const parameters = {
      uuid: uuid.v4(),
      name: compositeFields.name,
      description: compositeFields.description || '',
      subObjectives: compositeFields.subObjectives
   }
   const result = await cypher.send(statement, parameters)
   return compositeFromRecord(result[0])
}

const find = async(uuid) => {
   const statement = `
    MATCH (c:Composite {uuid: {uuid}})
    OPTIONAL MATCH (c) -[:COMPOSED_OF]-> (item:Item) -[:IN_CATEGORY]-> (category:Category)
    OPTIONAL MATCH (c) -[:COMPOSED_OF]-> (composite:Composite)
    RETURN c, collect(item) as items, collect(category) as categories, collect(composite) as composites`
   const result = await cypher.send(statement, {uuid})
   return compositeFromRecord(result[0])
}

export const compositeRepo = {
   create,
   find
}
