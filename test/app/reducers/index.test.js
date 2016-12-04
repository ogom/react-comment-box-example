import * as actions from '../../../app/actions'
import reducers from '../../../app/reducers'

describe('reducers', () => {
  let state
  beforeEach(() => {
    state = [undefined]
  })

  it('should return the initial state', () => {
    expect(
      reducers(undefined, {type: ''})
    ).toEqual(
      state
    )
  })

  it('should return the show comments', () => {
    const value = [{foo: '123', bar: '456'}]
    state = value
    expect(
      reducers(undefined, actions.showComments(value))
    ).toEqual(
      state
    )
  })

  it('should return the add a comment', () => {
    const value = {foo: '123', bar: '456'}
    state = [value]
    expect(
      reducers(undefined, actions.addComment(value))
    ).toEqual(
      state
    )
  })
})
