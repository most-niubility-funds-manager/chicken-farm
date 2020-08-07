import React, { useState } from 'react'
import { Wrapper, InputWrapper, Input } from './index.style'

const UnitForm = (props) => {
  const { theme } = props

  return (
    <Wrapper>
      <InputWrapper theme={theme}>
        总仓:
        <Input placeholder="份额" theme={theme} type="number" />
        <Input readOnly value="123123" theme={theme} />
      </InputWrapper>
      <InputWrapper theme={theme}>
        买卖:
        <Input placeholder="份额" theme={theme} type="number" />
        <Input placeholder="人民币" theme={theme} type="number" />
      </InputWrapper>
    </Wrapper>
  )
}

export default UnitForm
