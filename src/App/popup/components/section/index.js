import React from 'react'
import { Section, Name, Number, Detail } from './index.style'

const SectionItem = (props) => {
  const { data: { theme, name, total, count, percent } } = props
  
  return (
    <Section theme={theme}>
      <Name>{ name }</Name>
      <Number>{ total }</Number>
      <Detail>
        <span>{ count }</span>
        <span>{ percent }%</span>
      </Detail>
    </Section>
  )
}

export default SectionItem