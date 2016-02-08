import React from 'react'

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
        <h3>{category.name}</h3>
        <h4>Parents</h4>
        <ul>
          {category.parents.map(parent =>
            <li key={parent.uuid}>{parent.name}</li>
          )}
        </ul>
      </div>
    )
  }

}

export default ViewCategory
