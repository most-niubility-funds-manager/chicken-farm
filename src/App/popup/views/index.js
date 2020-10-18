/*
 * @Date: 2020-10-16 18:17:52
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-17 12:45:34
 * @Description: 项目wrapper
 */
import React, { useState } from 'react'
import styled from 'styled-components'
import Home from './home'

const Wrapper = styled.div.attrs({ className: "wrapper" })`
	width: 370px;
	height: 524px;
	background-color: var(--home-bg);
	position: relative;
  overflow: hidden;
  padding: 8px 8px 0;
`;

const App = () => {

  return (
    <Wrapper>
      {/* 切换页面 */}
      <Home></Home>
    </Wrapper>
  )
} 

export default App