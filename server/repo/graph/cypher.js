const request = require('koa-request')

const url = 'http://localhost:7474/db/data/transaction/commit'
const auth = {
  user: 'neo4j',
  pass: 'password',
  sendImmediately: true
}

const send = function *(statement, parameters) {
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
  const rows = []
  result.data.forEach(item => { // TODO Adopt more functional style
    const row = {}
    result.columns.forEach((colName, index) =>
      row[colName] = item.row[index]
    )
    rows.push(row)
  })
  return rows
}

module.exports = {send}
