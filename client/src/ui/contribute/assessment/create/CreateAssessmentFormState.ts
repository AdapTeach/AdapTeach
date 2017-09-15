import {AssessmentFields, EMPTY_ASSESSMENT_FIELDS} from '../../../../core/domain/Assessment'

export interface CreateAssessmentFormState extends AssessmentFields {
   prerequisiteSearchFormIsVisible: boolean
   assessedItemSearchFormIsVisible: boolean
   activelyRecalledItemSearchFormIsVisible: boolean
   passivelyRecalledItemSearchFormIsVisible: boolean
}


export const EMPTY_CREATE_ASSESSMENT_FORM: CreateAssessmentFormState = {
   ...EMPTY_ASSESSMENT_FIELDS,
   prerequisiteSearchFormIsVisible: false,
   assessedItemSearchFormIsVisible: false,
   activelyRecalledItemSearchFormIsVisible: false,
   passivelyRecalledItemSearchFormIsVisible: false
}
