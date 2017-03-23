import * as uuid from 'uuid'
import {cypher} from './graph/cypher'
import {addParentHierarchyToCategory} from './util/addParentHierarchyToCategory'
import {Category, CategoryFields} from '../domain/Category'
import {UUID} from '../domain/UUID'

const create = async (fields: CategoryFields): Promise<Category> => {
   if (fields.parent) {
      return await createChildCategory(fields)
   } else {
      return await createRootCategory(fields)
   }
}

const createRootCategory = async (fields: CategoryFields): Promise<Category> => {
   const statement = 'CREATE (c:Category:RootCategory {uuid: {uuid}, name: {name}}) RETURN c'
   const parameters = {
      uuid: uuid.v4(),
      ...fields
   }
   const records = await cypher.send(statement, parameters)
   return records[0].get('c').properties
}

function dtoFromRecord(record) {
   const created = record.get('c').properties
   const parents = record.get('parents').map(node => node.properties)
   addParentHierarchyToCategory(created, parents)
   return created
}

const createChildCategory = async (fields: CategoryFields): Promise<Category> => {
   const statement = `
    MATCH (p:Category { uuid:{parent} })
    CREATE (c:Category { uuid:{uuid}, name: {name} }) -[:CHILD_OF]-> (p)
    WITH c
    MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN c, collect(p) as parents`
   const parameters = {
      uuid: uuid.v4(),
      ...fields
   }
   const records = await cypher.send(statement, parameters)
   return dtoFromRecord(records[0])
}

const find = async (uuid: UUID): Promise<Category> => {
   const statement = `
    MATCH (c:Category {uuid: {uuid}})
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN c, collect(p) as parents`
   const records = await cypher.send(statement, {uuid})
   return dtoFromRecord(records[0])
}

const search = async (name: string): Promise<Category> => {
   const statement = `
    MATCH (c:Category)
    WHERE c.name  =~ {nameRegex}
    OPTIONAL MATCH (c) -[:CHILD_OF*]-> (p)
    RETURN c, collect(p) as parents`
   const nameRegex = `(?i)${name}.*`
   const parameters = {nameRegex}
   const records = await cypher.send(statement, parameters)
   return records.map(dtoFromRecord)
}

export const categoryRepo = {
   create,
   find,
   search
}
