import React from 'react'
import { Layout, Title, SubTitle, Sentence } from "../components/styleComponent";

const Glossary = props => {
  const {title} = props

  return (
    <Layout>
      <Title>{title}</Title>
      <SubTitle>涨跌幅</SubTitle>
      <Sentence>若当日开始交易，则显示实时动态；交易结束后显示最后一次的记录。</Sentence>
      <Sentence>QDII 基金、香港基金、短期理财、货币基金无法获取到当日交易的实时动态，只显示上次交易结束涨跌幅。</Sentence>

      <SubTitle>持有份额</SubTitle>
      <Sentence>可输入当前基金所拥有的份额，后续收益估算、持仓成本、预估收益通过份额进行计算</Sentence>

      <SubTitle>收益估算</SubTitle>
      <Sentence>计算公式为：收益 = (估值 - 净值) * 持有份额</Sentence>

      <SubTitle>净值</SubTitle>
      <Sentence>基金净值是基金上个交易日的最终价格</Sentence>
      
      <SubTitle>估值</SubTitle>
      <Sentence>基金估值是利用特定算法，根据即时的股票报价来进行的估算。但由于基金的持仓组合一季度才会公布一次，故而无法保障净值估算是准确的，且不同的平台之间因为算法不同也会有差别，故净值估算仅能作为参考。当日的实际净值需等到基金公司结算公布才可知。</Sentence>
      <Sentence>QDII 基金、香港基金、短期理财、货币基金暂无估值显示。</Sentence>
      
      <SubTitle>持仓成本</SubTitle>
      <Sentence>总持仓是计算今日之前的该基金总金额。  计算公式为：总持仓 = 净值 * 持有份额。</Sentence>

      <SubTitle>预估收益</SubTitle>
      <Sentence>当日所有基金的估算收益之和，与今日收益占总金额的涨跌幅百分比。</Sentence>
    </Layout>
  )
}

export default Glossary