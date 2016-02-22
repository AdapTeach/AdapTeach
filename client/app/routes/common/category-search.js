import React from 'react'
import SearchBar from 'react-search-bar'
import axios from 'axios'

class CategorySearch extends React.Component {

  constructor() {
    super()
    this.categoriesByName = {}
  }

  render() {
    return (
      <SearchBar
        onChange={::this.updateSuggestions}
        onSubmit={::this.onCategorySelected}
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
    this.props.onSelect(category)
  }

}

CategorySearch.propTypes = {
  onSelect: React.PropTypes.func.isRequired
}

export default CategorySearch
