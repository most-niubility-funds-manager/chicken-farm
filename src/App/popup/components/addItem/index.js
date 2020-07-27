/*
 * @Date: 2020-07-22 15:02:57
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-22 17:52:57
 * @Description: 添加鸡精
 */ 
import React from 'react'
import { Wrapper, Input, Button } from './index.style'

const AddFundItem = props => {
  const { theme } = props

  return (
    <Wrapper>
      <Input theme={theme} placeholder="输入基金代码,多个基金可用逗号隔开" />
      <Button theme={theme}>
        添加基金
      </Button>
    </Wrapper>
  )
}

export default AddFundItem