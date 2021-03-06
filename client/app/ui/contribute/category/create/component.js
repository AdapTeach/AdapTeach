import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {router, path} from 'router'

import {categoryData} from 'domain-data'
import {CategorySearch} from 'components'

class CreateCategory extends React.Component {

  state = {
    name: '',
    parent: null
  }

  render() {
    return (
      <div>
        <h2>Create Category</h2>
        <form onSubmit={::this.create}>
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
    this.setState({name: e.target.value})
  }

  onParentChange(parent) {
    this.setState({parent: parent})
  }

  create(e) {
    e.preventDefault()
    categoryData.create({
      name: this.state.name,
      parentId: this.state.parent.uuid
    }).then(created => router.goTo(path.contribute.category.display(created.uuid)))
  }

}

export const component = CreateCategory
