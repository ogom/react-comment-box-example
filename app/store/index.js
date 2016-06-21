import { createStore } from 'redux'

export default () => {
  const store = createStore((state=[], action) => {
    switch (action.type) {
    case 'show_comments':
      return action.comments
    case 'add_comment':
      return state.concat([action.comment])
    default:
      return state
    }
  })

  return store
}
