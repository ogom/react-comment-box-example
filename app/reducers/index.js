import { handleActions } from 'redux-actions'

const initialState = []

const reducerMap = {
  show_comments(state, action) {
    return action.payload
  },
  add_comment(state, action) {
    return state.concat([action.payload])
  }
}

export default handleActions(reducerMap, initialState)
