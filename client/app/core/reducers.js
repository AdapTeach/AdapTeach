const initialState = {}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CATEGORY_SELECTED':
      state.selectedCategory = action.category
      return state
    default:
      return state
  }
}

export default {
  app: reducer
}
