import * as actions from '../../../app/actions'

describe('actions', () => {
  it('should create an action to show the comments', () => {
    const value = []
    const expectedAction = {
      type: 'show_comments',
      payload: value
    }
    expect(
      actions.showComments(value)
    ).toEqual(
      expectedAction
    )
  })

  it('should create an action to add a comment', () => {
    const value = {foo: '123', bar: '456'}
    const expectedAction = {
      type: 'add_comment',
      payload: value
    }
    expect(
      actions.addComment(value)
    ).toEqual(
      expectedAction
    )
  })
})
