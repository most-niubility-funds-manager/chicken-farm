import styled from 'styled-components'

const Wrapper = styled.div.attrs({ className: 'table-sort' })`
  width: 10px;
  height: 20px;
  display: inline-block;
  position: relative;
  vertical-align: -6px;
  margin-left: 4px;

  &::before {
    position: absolute;
    top: 4px;
    left: 0;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 4px 5px 4px;
    border-color: transparent transparent ${props => props.theme.tableSortDefault} transparent;
  }

  &::after {
    position: absolute;
    bottom: 4px;
    left: 0;
    content: "";
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 5px 4px 0 4px;
    border-color: ${props => props.theme.tableSortDefault} transparent transparent transparent;
  }

  &.ascending {
    &::before {
      border-color: transparent transparent ${props => props.theme.tableSortActive} transparent;
    }
  }

  &.descending {
    &::after {
      border-color: ${props => props.theme.tableSortActive} transparent transparent transparent;
    }
  }
`

export { Wrapper }