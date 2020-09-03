import styled from "styled-components";
import Color from 'color';

const Section = styled.div.attrs({ className: 'section-item' })`
  width: 100%;
  height: 40px;
  color: ${props => props.theme.increase};
  background-color: ${props => props.theme.theadBg};
  display: grid;
  align-items: center;
  grid-template-columns: 40% 1fr;
  padding: 0 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  &.wideScreen {
    grid-template-columns: 40px 1fr 50px;
  }

  &:hover {
    background-color: ${props => Color(props.theme.theadBg).darken(0.3).rgb().string()};
  }
`

const Name = styled.div.attrs({ className: 'item-name' })`
  font-size: 12px;
  color: ${props => props.theme.normal};
  text-align: center;
  
  &:hover {
    text-decoration: underline;
  }
`

const Number = styled.p.attrs({ className: 'item-number' })`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  font-weight: bold;
  text-align: left;

  &.bad {
    color: ${props => props.theme.decrease};
  }
`

const Detail = styled.p.attrs({ className: 'item-detail' })`
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  font-size: 12px;

  &.bad {
    color: ${props => props.theme.decrease};
  }
`

export { Section, Name, Number, Detail }
