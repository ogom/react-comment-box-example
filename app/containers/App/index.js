import React, { Component } from 'react'
import CommentBox from '../../components/CommentBox'
import { connect } from 'react-redux'

class App extends Component {
  render() {
    const { data, actions } = this.props
    return (
      <div>
        <CommentBox
          data={data}
          actions={actions}
          url="http://localhost:3000/api/comments"
          pollInterval={2000}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    data: state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      showComments(comments) {
        dispatch({type: 'show_comments', comments: comments})
      },
      addComment(comment) {
        dispatch({type: 'add_comment', comment: comment})
      }
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
