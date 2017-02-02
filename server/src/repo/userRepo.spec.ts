import * as expect from 'expect'
import {userRepo} from './userRepo'
const stub = require('./stub.data')

describe('userRepo', () => {

  it('creates User', async() => {
    const userData = {
      name: 'Test User'
    }
    const user = await userRepo.create(userData)
    expect(user.uuid).toExist()
    expect(user.name).toEqual(userData.name)
  })

  describe('when User exists', () => {
    let user
    beforeEach(function *() {
      user = yield stub.user()
    })

    describe('when no personal Objectives are defined', () => {

      it('returns empty list of personal Objectives', function *() {
        const objectives = yield userRepo.findObjectives(user.uuid)
        expect(objectives.length).toEqual(0)
      })
    })

    describe('when a personal Objective is defined', () => {
      let objective
      beforeEach(function *() {
        objective = yield stub.item()
        yield userRepo.addObjective(user.uuid, objective.uuid)
      })

      it('finds added personal Objectives', function *() {
        const objectives = yield userRepo.findObjectives(user.uuid)
        const objectiveIds = objectives.map(o => o.uuid)
        expect(objectiveIds).toInclude(objective.uuid)
      })

      it('removes personal Objective', function *() {
        yield userRepo.removeObjective(user.uuid, objective.uuid)
        const objectives = yield userRepo.findObjectives(user.uuid)
        const objectiveIds = objectives.map(o => o.uuid)
        expect(objectiveIds).toExclude(objective.uuid)
      })

    })

  })

})
