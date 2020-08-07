import React from 'react'
import { Section, Name, Number, Detail } from './index.style'

const SectionItem = (props) => {
  const { data: { theme, name, total, count, percent } } = props
  const isRise = count > 0
  const countData = isRise ? `+${count}` : count
  const percentData = isRise ? `+${percent}` : percent

  const openMarket = () => {
    window.open('http://q.10jqka.com.cn/')
  }
  
  return (
    <Section theme={theme} onClick={openMarket}>
      <Name theme={theme}>{ name }</Name>
      <Number>{ total }</Number>
      <Detail>
        <span>{ countData }</span>
        <span>{ percentData }%</span>
      </Detail>
    </Section>
  )
}

export default SectionItem