var React = require('react');
var ReactDOM = require('react-dom');
var CommentBox = require('./app');

var data = [
  {id: 1, author: "Pete Hunt", text: "This is one comment"},
  {id: 2, author: "Jordan Walke", text: "This is *another* comment"}
];

ReactDOM.render(
  <CommentBox url="http://localhost:3000/api/comments" pollInterval={2000} />,
  document.getElementById('content')
);
