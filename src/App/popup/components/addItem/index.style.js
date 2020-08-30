import styled, { keyframes } from "styled-components";

const Wrapper = styled.div.attrs({ className: 'additem-wrapper' })`
  width: 100%;
  height: 36px;
  margin-bottom: 10px;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${props => props.theme.searchBg};
`

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`

const Input = styled.input`
  display: inline-block;
  width: calc(100% - 36px);
  height: 36px;
  padding: 0 1.5em;
  caret-color: ${props => props.theme.normal};
  color: ${props => props.theme.normal};
  background-color: ${props => props.theme.searchBg};
  /* animation: ${slideUp} 0.2s linear 0.2s forwards; */
  vertical-align: bottom;
`

const Button = styled.button`
  display: inline-flex;
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 0 4px 4px 0;
  background-color: ${props => props.theme.searchBtn};
  color: ${props => props.theme.normal};
  font-size: 20px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: ${props => props.theme.searchBtnHover};
  }
`

export { Wrapper, Input, Button }