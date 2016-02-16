import React from 'react'
import { Link }from 'react-router'

import StoreComponent from '../common/store-component'
import itemData from '../../core/data/item'
import categoryData from '../../core/data/category'

class ViewItem extends StoreComponent {

  render() {
    const id = this.props.params.id
    const item = itemData.get(id)
    if (!item) {
      return <div>Loading item details...</div>
    }
    const category = categoryData.get(item.categoryId)
    if (!category){
      return <div>Loading item details... (category)</div>
    }
    return (
      <div>
        <h1>View Item</h1>
        <h2>{item.name}</h2>
        <h3>
          {category.parents.slice().reverse().map(parent =>
            <span key={parent.uuid}><Link to={`/category/${parent.uuid}`}>{parent.name}</Link> > </span>
          )}
          <Link to={`/category/${category.uuid}`}>{category.name}</Link>
        </h3>
        <h4>{item.description}</h4>
      </div>
    )
  }

}

export default ViewItem
