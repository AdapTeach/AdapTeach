import React from 'react'
import { Link }from 'react-router'

import StoreComponent from '../common/store-component'
import categoryData from '../../core/data/category'

class ViewCategory extends StoreComponent {

  render() {
    const id = this.props.params.id
    const category = categoryData.get(id)
    if (!category) {
      return <div>Loading category details...</div>
    }
    return (
      <div>
        <h1>View Category</h1>
        <h3>
          {category.parents.slice().reverse().map(parent =>
            <span key={parent.uuid}><Link to={`/category/${parent.uuid}`}>{parent.name}</Link> > </span>
          )}
          {category.name}
        </h3>
      </div>
    )
  }

}

export default ViewCategory
