import styled from 'styled-components'

const Wrapper = styled.div.attrs({ className: "alert-box" })`
  width: ${props => props.width};
  height: 32px;
  text-align: left;
  line-height: 32px;
  border-radius: 2px;
  color: ${props => props.theme.importLoad};
  font-size: 12px;
  padding: 0 1em;

  &.error {
    color: ${props => props.theme.importError};
  }

  &.succ {
    color: ${props => props.theme.importSucc};
  }
`

export { Wrapper }