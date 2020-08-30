/*
 * @Date: 2020-07-28 23:13:59
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-30 15:38:41
 * @Description: loading 动画
 */ 
import React from 'react'
import { useSelector } from 'react-redux'
import { TextWrapper } from './index.style'

const Loading = (props) => {
  const theme = useSelector(state => state.theme)
  const { multi } = props

  {/* <Wrapper theme={theme} multi={multi}>
      <Content theme={theme} multi={multi} />
    </Wrapper> */}
  return (
    <TextWrapper theme={theme}>数据加载中,请耐心等待</TextWrapper>
  )
}

export default Loading