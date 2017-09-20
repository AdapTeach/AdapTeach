import {AssessmentFields, EMPTY_ASSESSMENT_FIELDS} from '../../../../../../common/Assessment'

export interface CreateAssessmentState {
   form: AssessmentFields
   prerequisiteSearchFormIsVisible: boolean
   assessedItemSearchFormIsVisible: boolean
   activelyRecalledItemSearchFormIsVisible: boolean
   passivelyRecalledItemSearchFormIsVisible: boolean
}

export const createAssessmentInitialState: CreateAssessmentState = {
   form: EMPTY_ASSESSMENT_FIELDS,
   prerequisiteSearchFormIsVisible: false,
   assessedItemSearchFormIsVisible: false,
   activelyRecalledItemSearchFormIsVisible: false,
   passivelyRecalledItemSearchFormIsVisible: false
}
