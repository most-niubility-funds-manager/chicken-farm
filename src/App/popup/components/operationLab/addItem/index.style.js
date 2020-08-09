import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: 'additem-wrapper' })`
  width: 280px;
  height: 36px;
  display: flex;
  align-items: center;
  margin-right: 35px;
`

const Input = styled.input`
  width: calc(100% - 36px);
  height: 100%;
  border-radius: 4px 0 0 4px;
  background-color: ${props => props.theme.searchBg};
  padding: 0 1.5em;
  caret-color: ${props => props.theme.normal};
  color: ${props => props.theme.normal};
`

const Button = styled.a`
  width: 36px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0 4px 4px 0;
  background-color: ${props => props.theme.searchBtn};
  color: ${props => props.theme.normal};
  font-size: 18px;
  cursor: pointer;
`

export { Wrapper, Input, Button }