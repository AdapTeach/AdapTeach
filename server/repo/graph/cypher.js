const request = require('koa-request')
const _ = require('lodash')

const url = 'http://localhost:7474/db/data/transaction/commit'
const auth = {
  user: 'neo4j',
  pass: 'password',
  sendImmediately: true
}

function *send(statement, parameters) {
  const options = {
    auth,
    json: {
      statements: [{statement, parameters}]
    }
  }
  const response = yield request.post(url, options)
  const result = response.body.results[0]
  if (!result)
    throw new Error(response.body.errors[0].message)
  return extractRows(result)
}

function extractRows(result) {
  return result.data.map(data => _.zipObject(result.columns, data.row))
}

function *sendMany(queries) {
  const options = {
    auth,
    json: {
      statements: queries
    }
  }
  const response = yield request.post(url, options)
  const results = response.body.results
  if (results.length < queries.length)
    throw new Error(response.body.errors.map(e => e.message))
  return results.map(extractRows)
}

module.exports = {send, sendMany}
