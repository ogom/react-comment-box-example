import React from 'react'
import { shallow } from 'enzyme'
import Comment from '../../../../app/components/Comment'

describe('components', () => {
  describe('Comment', () => {
    const wrapper = shallow(<Comment author={'foo'}>{'bar'}</Comment>)
    it('should return author and comment', () => {
      expect(wrapper.find('.commentAuthor').text()).toBe('foo')
      expect(wrapper.find('span').render().find('p').text()).toBe('bar')
    })
  })
})

