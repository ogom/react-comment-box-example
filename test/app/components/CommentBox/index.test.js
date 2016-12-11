import React from 'react'
import { shallow } from 'enzyme'
import CommentBox from '../../../../app/components/CommentBox'

describe('components', () => {
  describe('CommentBox', () => {
    const wrapper = shallow(<CommentBox/>)
    it('should return the Comments', () => {
      expect(wrapper.find('h1').text()).toBe('Comments')
    })
  })
})

