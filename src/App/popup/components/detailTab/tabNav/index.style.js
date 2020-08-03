import styled from "styled-components";

const Wrapper = styled.ul.attrs({ className: 'tab-nav' })`
  width: 100%;
  height: 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 10px;
`

const GridItem = styled.li.attrs({ className: 'tab-nav-item' })`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: ${props => props.theme.normal};
  cursor: pointer;
  position: relative;
  background-color: ${props => props.theme.tabNavBg};
  
  &:hover {
    &::before {
      transform: scale(1);
    }
  }

  &.active {
    &::before {
      transform: scale(1);
    }
  }

  &::before {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${props => props.theme.tabNavBorder};
    transform: scale(0);
    transition: all 0.15s ease-out;
  }
`

export { Wrapper, GridItem }
