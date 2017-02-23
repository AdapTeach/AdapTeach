import * as React from 'react'
import {itemEndpoint} from '../../../../endpoint/index'

export const CreateItem = () => <h1>CreateItem</h1>

// interface Form {
//    name: string,
//
// }
//
// const onSubmit = e => {
//    e.preventDefault()
//    itemEndpoint
//       .post({name: inputValue$.getValue()})
//       .subscribe(createdCategory => goToDisplay(createdCategory))
// }
//
// export const CreateItem = () => <div>
//    <h2>Create Item</h2>
//    <form onSubmit={onSubmit}>
//       <input value={this.state.name} onChange={onNameChange} hintText="Name"/><br/>
//       <TextField value={this.state.description} onChange={::this.onDescriptionChange} hintText="Description"/><br/>
//       <label>Category</label>
//          {this.state.category
//             ? <div>{this.state.category.name}</div>
//             : <CategorySearch onSelect={::this.onCategoryChange}/>}
//             <RaisedButton onClick={::this.create} disabled={!this.canSubmit()} primary label="Create"/>
//             </form>
//             </div>
