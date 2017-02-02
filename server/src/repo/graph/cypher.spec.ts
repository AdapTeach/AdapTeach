import * as expect from 'expect'
import {cypher} from './cypher'

describe('cypher', () => {

   it('sends request', async() => {
      const statement = 'CREATE (a:Person {name: {name}, title: {title}}) RETURN a'
      const params = {name: 'Arthur', title: 'King'}
      const result = await cypher.send(statement, params)
      const a = result[0].get('a').properties
      expect(a.name).toEqual('Arthur')
      expect(a.title).toEqual('King')
   })

})
