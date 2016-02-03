const initialState = {
  search: {
    term: '',
    results: []
  }
}

// TODO Replace sample reducer
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_TERM_CHANGED':
      state.search.term = action.term
      return state
    case 'SEARCH_REQUEST':
      state.search.results = [1, 2, 3]
      return state
    default:
      return state
  }
}

export default [reducer]
