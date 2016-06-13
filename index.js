var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require('./app');

var Redux = require('redux');
var createStore = Redux.createStore;
var store = createStore(function(state, action) {
  if (state === undefined) {
    return [];
  }

  switch (action.type) {
  case 'show_comments':
    return action.comments;
  case 'add_comment':
    return state.concat([action.comment]);
  default:
    return state;
  }
});

var ReactRedux = require('react-redux');
var Provider = ReactRedux.Provider;

ReactDOM.render(
  <Provider store={store}>
    <CommentBox url="http://localhost:3000/api/comments" pollInterval={2000} />
  </Provider>,
  document.getElementById('content')
);
