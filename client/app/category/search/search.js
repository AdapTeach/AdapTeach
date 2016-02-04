import React from 'react'
import SearchBar from 'react-search-bar'
import axios from 'axios'

import StoreComponent from '../../store-component'
import store from '../../store'

class CategorySearch extends StoreComponent {

  constructor() {
    super()
    this.categoriesByName = {}
  }

  render() {
    return (
      <SearchBar
        onChange={this.updateSuggestions.bind(this)}
        onSubmit={this.onCategorySelected.bind(this)}
      />
    )
  }

  updateSuggestions(input, resolve) {
    axios.get(`http://localhost:8000/api/category/search/${input}`)
      .then(response => {
        const categories = response.data
        categories.forEach(c => this.categoriesByName[c.name] = c)
        const names = categories.map(c => c.name)
        resolve(names)
      })
  }

  onCategorySelected(name) {
    const category = this.categoriesByName[name]
    store.dispatch({
      type: 'CATEGORY_SELECTED',
      category
    })
  }

}

export default CategorySearch
