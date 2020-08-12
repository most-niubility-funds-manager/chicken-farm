/*
 * @Date: 2020-07-21 11:39:06
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-11 17:54:25
 * @Description: 叽叽叽叽
 */ 
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { GlobalStyle, theme } from '../styles/index'
import store from './redux/store'
import Home from './view/home/index'

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <Home theme={theme.dark} />
  </Provider>,
  document.querySelector("#root")
)