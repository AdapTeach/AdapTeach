import * as expect from 'expect'
import {userRepo} from './userRepo'
import {stub} from './stubFactory'

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
      beforeEach(async() => {
         user = await stub.user()
      })

      describe('when no personal Objectives are defined', () => {

         it('returns empty list of personal Objectives', async() => {
            const objectives = await userRepo.findObjectives(user.uuid)
            expect(objectives.length).toEqual(0)
         })
      })

      describe('when a personal Objective is defined', () => {
         let objective
         beforeEach(async() => {
            objective = await stub.item()
            await userRepo.addObjective(user.uuid, objective.uuid)
         })

         it('finds added personal Objectives', async() => {
            const objectives = await userRepo.findObjectives(user.uuid)
            const objectiveIds = objectives.map(o => o.uuid)
            expect(objectiveIds).toInclude(objective.uuid)
         })

         it('removes personal Objective', async() => {
            await userRepo.removeObjective(user.uuid, objective.uuid)
            const objectives = await userRepo.findObjectives(user.uuid)
            const objectiveIds = objectives.map(o => o.uuid)
            expect(objectiveIds).toExclude(objective.uuid)
         })

      })

   })

})
