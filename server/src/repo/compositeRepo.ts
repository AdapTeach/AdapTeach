import * as uuid from 'uuid'
import {InvalidArgumentError} from '../error/InvalidArgumentError'
import {cypher} from './graph/cypher'
import {Composite, CompositeFields} from '../domain/Composite'
import {UUID} from '../domain/UUID'
import {COMPOSITE, ITEM} from '../domain/Objective'

function compositeFromRecord(record) {
   const composite = record.get('c').properties
   const itemNodes = record.keys.indexOf('items') >= 0 ? record.get('items') : []
   const items = itemNodes.map(node => node.properties).map(item => ({...item, type: ITEM}))
   const categoryNodes = record.keys.indexOf('categories') >= 0 ? record.get('categories') : []
   const categories = categoryNodes.map(node => node.properties)
   const compositeNodes = record.keys.indexOf('composites') >= 0 ? record.get('composites') : []
   const composites = compositeNodes.map(node => node.properties).map(composite => ({
      ...composite,
      type: COMPOSITE
   }))
   composite.subObjectives = [...items, ...composites]
   return {
      ...composite,
      type: COMPOSITE
   }
}

const create = async (fields: CompositeFields): Promise<Composite> => {
   if (!fields.name) throw new InvalidArgumentError('Name is missing on Composite to create')
   let statement = `
    CREATE (c:Composite:Objective {uuid: {uuid}, name: {name}, description: {description}})
    RETURN c`
   // We're making sure the subObjectives array is NOT empty, in which case using the second query
   // will result in the created Composite not being returned
   if (fields.subObjectives && fields.subObjectives.length > 0) statement = `
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
      ...fields
   }
   const result = await cypher.send(statement, parameters)
   return compositeFromRecord(result[0])
}

const find = async (uuid: UUID): Promise<Composite> => {
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
