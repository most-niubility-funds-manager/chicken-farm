/*
 * @Date: 2020-07-22 15:02:57
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-29 12:13:58
 * @Description: 添加鸡精
 */ 
import React, { useState, useRef } from 'react'
import { Wrapper, Input, Button } from './index.style'
import { convertCodeFetch } from '../../services'
import { useDispatch } from 'react-redux'
import { CHANGE_SEARCH_STATE, SET_SEARCH_LOADING, SET_SEARCH_RESULT } from '../../redux/actionTypes'

const AddFundItem = props => {
  const { theme } = props
  const input = useRef(null)
  const dispatch = useDispatch()
  
  const keyDownHandler = (e) => {
    const { keyCode } = e
    if (keyCode === 13) {
      submitHandler()
      e.preventDefault() 
    }
  }

  const submitHandler = () => {
    const { value } = input.current
    const spaceReg = /\s/g
    const commaReg = /,|，/g
    if (value.replace(spaceReg, '').length) {
      const code = value.split(commaReg).map(v => v.replace(spaceReg, ''))
      dispatch({ type: CHANGE_SEARCH_STATE, state: true })
      dispatch({ type: SET_SEARCH_LOADING, state: true })
      convertCodeFetch(code).then(_ => {
        dispatch({ type: SET_SEARCH_RESULT, data: {..._} })
        dispatch({ type: SET_SEARCH_LOADING, state: false })
      })
    }
    return
  }

  return (
    <Wrapper>
      <Input ref={input} theme={theme} placeholder="输入基金代码,多个基金可用逗号隔开" onKeyDown={keyDownHandler} />
      <Button theme={theme} onClick={submitHandler}>
        添加基金
      </Button>
    </Wrapper>
  )
}

export default AddFundItem