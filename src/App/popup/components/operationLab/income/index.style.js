import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: 'income-box' })`
  width: auto;
  height: 36px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.normal};
  cursor: pointer;
`

const Tag = styled.span`
  width: auto;
  min-width: 28px;
  height: 24px;
  line-height: 24px;
  box-sizing: content-box;
  padding: 0 4px;
  border-radius: 4px;
  font-size: 12px;
  color: ${props => props.theme.normal};
  background-color: ${props => props.theme.increase};
  margin-left: 10px;
  text-align: right;

  &.bad {
    background-color: ${props => props.theme.decrease};
  }
`

export { Wrapper, Tag }
