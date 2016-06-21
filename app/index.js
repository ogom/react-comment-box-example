import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import App from './containers/App'

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
    <App />
  </Provider>,
  document.getElementById('content')
)
