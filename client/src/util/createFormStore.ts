import {FormStore} from './FormStore'

export function createFormStore<FormState>(initialFormState: FormState): FormStore<FormState> {
   class DynamicFormStore extends FormStore<FormState> {
   }

   return new DynamicFormStore(initialFormState)
}
