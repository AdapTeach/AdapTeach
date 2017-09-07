import {ComponentStore} from './ComponentStore'

export function createFormStore<FormState>(initialFormState: FormState): ComponentStore<FormState> {
   class FormStore extends ComponentStore<FormState> {
   }

   return new FormStore(initialFormState)
}
