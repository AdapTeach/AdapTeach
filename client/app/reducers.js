const initialState = {
  categoryList: []
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CATEGORY_LIST_UPDATED':
      state.categoryList = action.data
      return state
    default:
      return state
  }
}

export default {
  app: reducer
}
