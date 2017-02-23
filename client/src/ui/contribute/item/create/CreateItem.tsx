import * as React from 'react'
import {Category} from '../../../../core/domain/Category'
import {CategorySearch} from '../../../common/CategorySearch'
import {logAndReturn} from '../../../../util/logAndReturn'

interface Form {
   name: string,
   selectedCategory: Category
}

// const onSubmit = e => {
//    e.preventDefault()
//    itemEndpoint
//       .post({name: inputValue$.getValue()})
//       .subscribe(createdCategory => goToDisplay(createdCategory))
// }

export const CreateItem = () => <div>
   <h2>Create Item</h2>
   <CategorySearch onSelect={logAndReturn}/>
</div>
