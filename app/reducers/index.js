export default (state=[], action) => {
  switch (action.type) {
  case 'show_comments':
    return action.comments
  case 'add_comment':
    return state.concat([action.comment])
  default:
    return state
  }
}
