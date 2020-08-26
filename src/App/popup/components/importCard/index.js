import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Wrapper, Mask, Content } from './index.style'

const ImportCard = (props) => {
  const { active, closeEvent } = props

  return (
    <Wrapper>
      <Mask className={ !active && 'cancel' } onClick={closeEvent}></Mask>
      <Content className={ !active && 'cancel' }></Content>
    </Wrapper>
  )
}

export default ImportCard