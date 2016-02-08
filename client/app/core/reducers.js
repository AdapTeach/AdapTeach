import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  data: {
    categories: {}
  }
})

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'CATEGORY_LOADED':
      const category = action.payload
      return state.setIn(['data', 'categories', category.uuid], category)
    default:
      return state
  }
}

export default {
  app: reducer
}
