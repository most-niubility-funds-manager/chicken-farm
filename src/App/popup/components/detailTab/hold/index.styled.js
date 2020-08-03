import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow: overlay;
`

const Header = styled.div.attrs({ className: 'hold-header' })`
  width: 100%;
  height: 40px;
  display: grid;
  align-items:center;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  font-weight: bold;
`

const BodyItem = styled.div`
  width: 100%;
  height: 30px;
  display: grid;
  align-items:center;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
`

const Cell = styled.span`
  font-size: 14px;
  color: ${props => props.color || props.theme.normal};

  &.increase {
    color: ${props => props.theme.increase};
  }
  &.decrease {
    color: ${props => props.theme.decrease};
  }
`

export { Wrapper, Header, Cell, BodyItem }