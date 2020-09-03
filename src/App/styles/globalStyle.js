/*
 * @Date: 2020-06-27 22:52:10
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-09-03 11:50:18
 * @Description: 全局样式
 */

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body,
  div,
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  table,
  thead,
  tbody,
  tr,
  td,
  th
   {
    margin: 0;
    padding: 0;
  }

  * {
    box-sizing: border-box;
    scroll-behavior: smooth;
    font-size: 12px;
  }

  ul,
  ol,
  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button,
  input {
    border: none;
    box-shadow: none;
    outline: none;
    padding: 0;
    margin: 0;
  }

  input::-webkit-inner-spin-button,
  input::-webkit-outer-spin-button{
    appearance: none;
  }

  ::-webkit-scrollbar {
    width: 1px;
    height: 1px;
    background-color: transparent;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #1d5490;
  }
  body {
    background-color: ${(props) => props.bg || 'rgb(18, 18, 18)'};
    font-family: SanFrancisco, DIN;
  }
`;
