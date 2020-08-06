/*
 * @Date: 2020-07-23 10:08:17
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-06 15:06:05
 * @Description: 操作栏
 */ 
import React from 'react'
import { useSelector } from 'react-redux'
import { Wrapper } from "./index.style";
import Income from './income'
import AddItem from './addItem'

const OperationLab = () => {
  const theme = useSelector(state => state.theme)

  return (
    <Wrapper>
      <AddItem theme={theme} />
      <Income theme={theme} />
    </Wrapper>
  )
}

export default OperationLab
