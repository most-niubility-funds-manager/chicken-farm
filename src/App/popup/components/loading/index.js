/*
 * @Date: 2020-07-28 23:13:59
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-29 00:04:28
 * @Description: loading 动画
 */ 
import React from 'react'
import { useSelector } from 'react-redux'
import { Wrapper, Content } from './index.style'

const Loading = (props) => {
  const theme = useSelector(state => state.theme)
  const { multi } = props

  return (
    <Wrapper theme={theme} multi={multi}>
      <Content theme={theme} multi={multi} />
    </Wrapper>
  )
}

export default Loading