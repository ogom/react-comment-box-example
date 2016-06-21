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

class CommentList extends Component {
  render() {
    const commentNodes = this.props.data.map((comment) => {
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
}

class CommentForm extends Component {
  constructor(props) {
    super(props)
    this.state = {author: '', text: ''}
  }

  handleAuthorChange(e) {
    this.setState({author: e.target.value})
  }

  handleTextChange(e) {
    this.setState({text: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault()
    const author = this.state.author.trim()
    const text = this.state.text.trim()
    if (!text || !author) {
      return
    }
    this.props.onCommentSubmit({author: author, text: text})
    this.setState({author: '', text: ''})
  }

  render() {
    return (
      <form className="commentForm" onSubmit={this.handleSubmit.bind(this)}>
        <input
          type="text"
          placeholder="Your name"
          value={this.state.author}
          onChange={this.handleAuthorChange.bind(this)}
        />
        <input
          type="text"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange.bind(this)}
        />
        <input type="submit" value="Post" />
      </form>
    )
  }
}

class CommentBox extends Component {
  constructor(props) {
    super(props)
    this.state = {data: []}
  }

  loadCommentsFromServer() {
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
  }

  handleCommentSubmit(comment) {
    const comments = this.state.data
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
  }

  componentDidMount() {
    this.loadCommentsFromServer()
    setInterval(this.loadCommentsFromServer.bind(this), this.props.pollInterval)
  }

  render() {
    return (
      <div className="commentBox">
        <h1>Comments</h1>
        <CommentList data={this.props.data} />
        <CommentForm onCommentSubmit={this.handleCommentSubmit.bind(this)} />
      </div>
    )
  }
}

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
