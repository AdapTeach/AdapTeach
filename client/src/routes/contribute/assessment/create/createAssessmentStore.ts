import { append, equals, reject, remove } from 'ramda'

import { AssessmentAnswer } from '../../../../../../common/Assessment'
import { AssessmentFields } from '../../../../core/domain/Assessment'
import { Objective } from '../../../../core/domain/Objective'
import { UUID } from '../../../../core/domain/UUID'
import { assessmentEndpoint } from '../../../../endpoint'
import { path } from '../../../../router/path'
import { router } from '../../../../router/router'
import { rootStore } from '../../../../state/store'
import { createAssessmentInitialState, CreateAssessmentState } from './CreateAssessmentState'

export const createAssessmentStore = rootStore.focusPath('routes', 'createAssessment')
   .actionTypes<{
      updateFields: Partial<CreateAssessmentState['form']>
      addAnswer: void
      updateAnswer: { index: number, answer: Partial<AssessmentAnswer> }
      toggleAnswerIsCorrect: { index: number }
      deleteAnswer: { index: number }
      showPrerequisitesSearchForm: void
      onPrerequisiteSelection: { objective: Objective }
      removePrerequisite: { id: UUID }
      showAssessedItemSearchForm: void
      onAssessedItemSelection: { id: UUID }
      removeAssessedItem: { id: UUID }
      showActivelyRecalledItemSearchForm: void
      onActivelyRecalledItemSelection: { id: UUID }
      removeActivelyRecalledItem: { id: UUID }
      showPassivelyRecalledItemSearchForm: void
      onPassivelyRecalledItemSelection: { id: UUID }
      removePassivelyRecalledItem: { id: UUID }
      createAssessment: void
      resetForm: void
   }>()
   .updates(_ => ({
      updateFields: (fields) => _.focusPath('form').setFields(fields),
      addAnswer: () => _.focusPath('form', 'answers').update(answers => [...answers, { text: '', correct: false }]),
      updateAnswer: ({ index, answer }) => _.focusPath('form', 'answers').focusIndex(index).throwIfUndefined().setFields(answer),
      toggleAnswerIsCorrect: ({ index }) => _.focusPath('form', 'answers').focusIndex(index).throwIfUndefined().updateFields({ correct: _ => !_ }),
      deleteAnswer: ({ index }) => _.focusPath('form', 'answers').update(remove(index, 1)),
      showPrerequisitesSearchForm: () => _.focusPath('prerequisiteSearchFormIsVisible').setValue(true),
      onPrerequisiteSelection: ({ objective }) => _.pipe(
         _.focusPath('form', 'prerequisiteIds').update(append(objective.uuid)),
         _.setFields({ prerequisiteSearchFormIsVisible: false })
      ),
      removePrerequisite: ({ id }) => _.focusPath('form', 'prerequisiteIds').update(reject(equals(id))),
      showAssessedItemSearchForm: () => _.focusPath('assessedItemSearchFormIsVisible').setValue(true),
      onAssessedItemSelection: ({ id }) => _.pipe(
         _.focusPath('form', 'assessedItemIds').update(append(id)),
         _.setFields({ assessedItemSearchFormIsVisible: false })
      ),
      removeAssessedItem: ({ id }) => _.focusPath('form', 'assessedItemIds').update(reject(equals(id))),
      showActivelyRecalledItemSearchForm: () => _.focusPath('activelyRecalledItemSearchFormIsVisible').setValue(true),
      onActivelyRecalledItemSelection: ({ id }) => _.pipe(
         _.focusPath('form', 'activelyRecalledItemIds').update(append(id)),
         _.focusPath('activelyRecalledItemSearchFormIsVisible').setValue(false)
      ),
      removeActivelyRecalledItem: ({ id }) => _.focusPath('form', 'activelyRecalledItemIds').update(reject(equals(id))),
      showPassivelyRecalledItemSearchForm: () => _.focusPath('passivelyRecalledItemSearchFormIsVisible').setValue(true),
      onPassivelyRecalledItemSelection: ({ id }) => _.pipe(
         _.focusPath('form', 'passivelyRecalledItemIds').update(append(id)),
         _.focusPath('passivelyRecalledItemSearchFormIsVisible').setValue(false)
      ),
      removePassivelyRecalledItem: ({ id }) => _.focusPath('form', 'passivelyRecalledItemIds').update(reject(equals(id))),
      resetForm: () => _.setValue(createAssessmentInitialState)
   }))
   .epics({
      createAssessment: ($, store) => $
         .map(() => ({
            ...store.currentState.form,
            type: 'Quiz'
         }) as AssessmentFields)
         .switchMap(assessment => assessmentEndpoint.post(assessment))
         .map(assessment => path.contribute.assessment.display(assessment.uuid))
         .map(url => ({ navigateTo: { url } }))
   })
   .sideEffects({
      navigateTo: ({ url }) => router.goTo(url)
   })

