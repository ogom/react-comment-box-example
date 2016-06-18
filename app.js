import React, { Component } from 'react'
import Remarkable from 'remarkable'
import $ from 'jquery'
import { connect } from 'react-redux'

class Comment extends Component {
  rawMarkup() {
    const md = new Remarkable()
    const rawMarkup = md.render(this.props.children.toString())
    return { __html: rawMarkup }
  }

  render() {
    return (
      <div className="comment">
        <h2 className="commentAuthor">
          {this.props.author}
        </h2>
        <span dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    )
  }
}

var CommentList = React.createClass({
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        <Comment author={comment.author} key={comment.id}>
          {comment.text}
        </Comment>
      )
    })
    return (
      <div className="commentList">
        {commentNodes}
      </div>
    )
  }
})

var CommentForm = React.createClass({
  getInitialState: function() {
    return {author: '', text: ''}
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value})
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value})
  },
  handleSubmit: function(e) {
    e.preventDefault()
    var author = this.state.author.trim()
    var text = this.state.text.trim()
    if (!text || !author) {
      return
    }
    this.props.onCommentSubmit({author: author, text: text})
    this.setState({author: '', text: ''})
  },
  render: function() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    )
  }
})

var CommentBox = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.props.showComments(data)
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  handleCommentSubmit: function(comment) {
    var comments = this.state.data
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now()
    this.props.addComment(comment)
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.props.showComments(data)
      }.bind(this),
      error: function(xhr, status, err) {
        this.props.showComments(comments)
        console.error(this.props.url, status, err.toString())
      }.bind(this)
    })
  },
  getInitialState: function() {
    return {data: []}
  },
  componentDidMount: function() {
    this.loadCommentsFromServer()
    setInterval(this.loadCommentsFromServer, this.props.pollInterval)
  },
  render: function() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit} />
      </div>
    )
  }
})

const mapStateToProps = (state) => {
  return {data: state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    showComments(comments) {
      dispatch({type: 'show_comments', comments: comments})
    },
    addComment(comment) {
      dispatch({type: 'add_comment', comment: comment})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentBox)
