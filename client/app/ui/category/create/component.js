import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {createContainerComponent} from 'util'
import {router, path} from 'router'

import {categoryData} from 'domain-data'
import {CategorySearch} from 'components'

class CreateCategory extends React.Component {

  state = {}

  constructor() {
    super()
    this.name = ''
  }

  render() {
    return (
      <div>
        <h2>Create Category</h2>
        <form>
          <TextField onChange={::this.onNameChange} hintText="Name" ref="categoryName"/><br/>
          <label>Parent Category</label>
          {this.state.parent
            ? <div>{this.state.parent.name}</div>
            : <CategorySearch onSelect={::this.onParentChange}/>}
          <RaisedButton onClick={::this.create} primary label="Create"/>
        </form>
      </div>
    )
  }

  onNameChange(e) {
    this.name = e.target.value
  }

  onParentChange(parent) {
    this.setState({parent: parent})
  }

  create(e) {
    e.preventDefault()
    categoryData.create({
      name: this.name,
      parentId: this.state.parent.uuid
    }).then(created => router.goTo(path.category.display(created.uuid)))
  }

}

export const component = CreateCategory
