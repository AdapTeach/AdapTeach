import * as React from 'react'
import {Category} from '../../../../core/domain/Category'
import {CategorySearch} from '../../../common/CategorySearch'
import {itemEndpoint} from '../../../../endpoint/index'
import {router} from '../../../../router/router'
import {path} from '../../../../router/path'

interface State {
   name: string,
   description: string,
   category?: Category
}

export class CreateItem extends React.Component<{}, State> {

   constructor() {
      super()
      this.state = {
         name: '',
         description: ''
      }
   }

   render() {
      return <form onSubmit={this.onSubmit}>
         <h2>Create Item</h2>
         <input placeholder='Name' onChange={this.onNameChange}/>
         <br />
         <input placeholder='Description' onChange={this.onDescriptionChange}/>
         <CategorySearch onSelect={category => this.setState({category})}/>
         <button onClick={this.onSubmit} disabled={!this.canSubmit()}>Create</button>
      </form>
   }

   onNameChange = (e) => this.setState({name: e.target.value})

   onDescriptionChange = (e) => this.setState({description: e.target.value})

   canSubmit = () => this.state.name.length > 1 && this.state.category

   onSubmit = e => {
      e.preventDefault()
      if (!this.canSubmit()) return
      itemEndpoint
         .post({
            name: this.state.name,
            description: this.state.description,
            category: this.state.category.uuid
         })
         .subscribe(createdItem => router.goTo(path.contribute.item.display(createdItem.uuid)))
   }

}
