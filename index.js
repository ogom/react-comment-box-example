var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require('./app');

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

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
store.subscribe(function () {
  return console.log(store.getState());
});
store.dispatch({type: 'show_comments', comments: data});
store.dispatch({type: 'add_comment', comment: {author: "foo", text: "*bar*"}});

ReactDOM.render(
  <CommentBox url="http://localhost:3000/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
