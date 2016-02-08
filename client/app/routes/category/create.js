import React from 'react'
import TextField from 'material-ui/lib/text-field'
import SelectField from 'material-ui/lib/SelectField'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button'

import CategorySearch from '../common/category-search'
import categoryEndpoint from '../../core/endpoint/category'
import history from '../../main/history'

class CreateCategory extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <h2>Create Category</h2>
        <form onSubmit={this.create}>
          <TextField hintText="Name" ref="categoryName"/><br/>
          <label>Parent Category</label>
          {this.state.parentCategory ?
            <div>{this.state.parentCategory.name}</div>
            : <CategorySearch onSelect={this.selectParentCategory.bind(this)}/>}
          <RaisedButton onClick={this.create.bind(this)} secondary label="Create"/>
        </form>
      </div>
    )
  }

  selectParentCategory(category) {
    this.setState({
      parentCategory: category
    })
  }

  create(e) {
    e.preventDefault()
    const category = {
      name: this.refs.categoryName.getValue()
    }
    if (this.state.parentCategory)
      category.parentId = this.state.parentCategory.uuid
    categoryEndpoint.create(category)
      .then(created => history.push(`/category/${created.uuid}`))
  }

}

export default CreateCategory

