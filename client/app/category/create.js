import React, { Component }  from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

class CreateCategory extends Component {

  render() {
    return (
      <div>
        <h2>Create Category</h2>
        <form onSubmit={this.create}>
          <TextField hintText="Name"/><br/>
          <RaisedButton secondary label="Create"/>
        </form>
      </div>
    )
  }

  create(e) {
    e.preventDefault()
    console.log('CREATE')
  }

}

export default CreateCategory

