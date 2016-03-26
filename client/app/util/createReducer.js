export const createReducer = (initialState, behavior) =>
  (state = initialState, action) =>
    behavior[action.type] ? behavior[action.type](state, action) : state
