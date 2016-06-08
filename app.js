var React = require('react');
var Remarkable = require('remarkable');
var $ = require('jquery');

var CommentBox = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
        Hello, world! I am a CommentBox.
      </div>
    );
  }
});

module.exports = CommentBox;
