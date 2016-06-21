import React from 'react'
import ReactDOM from 'react-dom'
import CommentBox from './containers/App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

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

ReactDOM.render(
  <Provider store={store}>
    <CommentBox url="http://localhost:3000/api/comments" pollInterval={2000} />
  </Provider>,
  document.getElementById('content')
)
