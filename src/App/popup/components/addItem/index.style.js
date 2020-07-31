import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: 'additem-wrapper' })`
  width: 340px;
  height: 36px;
  display: flex;
  align-items: center;
`

const Input = styled.input`
  width: calc(100% - 80px);
  height: 100%;
  border-radius: 4px 0 0 4px;
  background-color: ${props => props.theme.searchBg};
  padding: 0 1.5em;
  caret-color: ${props => props.theme.normal};
  color: ${props => props.theme.normal};
`

const Button = styled.a`
  width: 80px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 4px 4px 0;
  background-color: ${props => props.theme.searchBtn};
  color: ${props => props.theme.normal};
  font-size: 12px;
  cursor: pointer;
`

export { Wrapper, Input, Button }