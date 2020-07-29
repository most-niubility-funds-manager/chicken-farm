import React from 'react'
import { Section, Name, Number, Detail } from './index.style'

const SectionItem = (props) => {
  const { data: { theme, name, total, count, percent } } = props
  const isRise = count > 0
  const countData = isRise ? `+${count}` : count
  const percentData = isRise ? `+${percent}` : percent
  
  return (
    <Section theme={theme}>
      <Name>{ name }</Name>
      <Number>{ total }</Number>
      <Detail>
        <span>{ countData }</span>
        <span>{ percentData }%</span>
      </Detail>
    </Section>
  )
}

export default SectionItem