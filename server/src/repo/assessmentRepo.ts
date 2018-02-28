import {InconsistentDatabaseError} from '../error/InconsistentDatabaseError'
import {InvalidArgumentError} from '../error/InvalidArgumentError'
import {cypher} from './graph/cypher'
import * as uuid from 'uuid'
import {AssessmentData} from '../domain/Assessment'

const assessmentFromRecord = (record) => {
   const assessmentNode = record.get('assessment')
   const assessment = assessmentNode.properties

   const labels = assessmentNode.labels.filter(l => l !== 'Assessment')
   if (labels.length !== 1) throw new InconsistentDatabaseError()
   assessment.type = labels[0]

   const keys = [
      'assessedItems',
      'prerequisites',
      'activelyRecalledItems',
      'passivelyRecalledItems'
   ]
   keys.forEach(key => {
      if (record.keys.indexOf(key) >= 0) {
         assessment[key] = record.get(key).map(node => node.properties)
      } else {
         assessment[key] = []
      }
   })

   assessment.answers = JSON.parse(assessment.answers)

   return assessment
}

async function create(assessmentData: AssessmentData) {
   if (assessmentData.type !== 'Quiz') {
      throw new InvalidArgumentError('Unsupported assessment type: ' + assessmentData.type)
   }
   const assessmentType = 'Quiz'
   ////////////////////
   // PREREQUISITES //
   //////////////////
   let createPrerequisiteRelationships = ''
   let prerequisites = ''
   if (assessmentData.prerequisiteIds && assessmentData.prerequisiteIds.length > 0) {
      createPrerequisiteRelationships = `
    UNWIND {prerequisiteIds} AS prerequisiteId
      MATCH (preq:Objective {uuid: prerequisiteId})
      CREATE (assessment) -[:REQUIRES]-> (preq)
    WITH assessment, assessedItems, collect(preq) as prerequisites`
      prerequisites = ', prerequisites'
   }

   //////////////////////////////
   // ACTIVELY RECALLED ITEMS //
   ////////////////////////////
   let createActivelyRecalledItemRelationships = ''
   let activelyRecalledItems = ''
   if (assessmentData.activelyRecalledItemIds && assessmentData.activelyRecalledItemIds.length > 0) {
      createActivelyRecalledItemRelationships = `
    UNWIND {activelyRecalledItemIds} AS activelyRecalledItemId
      MATCH (actively:Item {uuid: activelyRecalledItemId})
      CREATE (assessment) -[:ACTIVELY_RECALLS]-> (actively)
    WITH assessment, assessedItems, collect(actively) as activelyRecalledItems ${prerequisites}`
      activelyRecalledItems = ', activelyRecalledItems'
   }

   ///////////////////////////////
   // PASSIVELY RECALLED ITEMS //
   /////////////////////////////
   let createPassivelyRecalledItemRelationships = ''
   let passivelyRecalledItems = ''
   if (assessmentData.passivelyRecalledItemIds && assessmentData.passivelyRecalledItemIds.length > 0) {
      createPassivelyRecalledItemRelationships = `
    UNWIND {passivelyRecalledItemIds} AS passivelyRecalledItemId
      MATCH (passively:Item {uuid: passivelyRecalledItemId})
      CREATE (assessment) -[:PASSIVELY_RECALLS]-> (passively)`
      passivelyRecalledItems = ', collect(passively) as passivelyRecalledItems'
   }

   const statement = `
    CREATE (assessment:Assessment:${assessmentType} {uuid: {uuid}, question: {question}, answers: {answers}})
    WITH assessment
    UNWIND {assessedItemIds} AS assessedItemId
      MATCH (i:Item {uuid: assessedItemId})
      CREATE (assessment) -[:ASSESSMENT_FOR]-> (i)
    WITH assessment, collect(i) as assessedItems
    ${createPrerequisiteRelationships}
    ${createActivelyRecalledItemRelationships}
    ${createPassivelyRecalledItemRelationships}
    RETURN assessment, assessedItems ${prerequisites} ${activelyRecalledItems} ${passivelyRecalledItems}`
   const parameters = Object.assign(
      {uuid: uuid.v4()},
      assessmentData,
      {answers: JSON.stringify(assessmentData.answers)}
   )
   const records = await cypher.send(statement, parameters)
   return assessmentFromRecord(records[0])
}

const find = async (uuid) => {
   const statement = `
    MATCH (assessment:Assessment {uuid: {uuid}}) -[:ASSESSMENT_FOR*]-> (assessed:Item)
    OPTIONAL MATCH (assessment) -[:REQUIRES]-> (preq:Objective)
    OPTIONAL MATCH (assessment) -[:ACTIVELY_RECALLS]-> (actively:Item)
    OPTIONAL MATCH (assessment) -[:PASSIVELY_RECALLS]-> (passively:Item)
    RETURN assessment, collect(assessed) as assessedItems, collect(preq) as prerequisites,
           collect(actively) as activelyRecalledItems, collect(passively) as passivelyRecalledItems`
   const records = await cypher.send(statement, {uuid})
   const record = records[0]
   if (!record) throw new InvalidArgumentError(`No Assessment found for id ${uuid}`)
   return assessmentFromRecord(record)
}

export const assessmentRepo = {
   create,
   find
}
