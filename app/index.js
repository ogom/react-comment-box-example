import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ipcRenderer } from 'electron'

import App from './containers/App'
import configureStore from './store'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
)

ipcRenderer.on('ipc::dispatch', (e, action) => {
  store.dispatch(action)
})
