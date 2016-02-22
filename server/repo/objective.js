const uuid = require('node-uuid')

const cypher = require('./graph/cypher')

const search = function *(name) {
  const statement = `
    MATCH (i:Item) -[:IN_CATEGORY]-> (c)
    WHERE i.name  =~ {nameRegex}
    RETURN i, c`
  const nameRegex = `(?i)${name}.*`
  const parameters = {nameRegex}
  const result = yield cypher.send(statement, parameters)
  return {
    items: result
      .map(row => {
        const item = row.i
        item.categoryId = row.c.uuid
        return item
      })
  }
}

module.exports = {
  search
}
