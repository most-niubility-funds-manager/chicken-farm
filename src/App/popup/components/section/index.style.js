import styled from "styled-components";
import Color from 'color'

const Section = styled.div.attrs({ className: 'section-item' })`
  width: 100px;
  height: 80px;
  border-radius: 5px;
  border: 1px solid ${props => props.theme.background};
  color: ${props => props.theme.background};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-image: linear-gradient(to bottom, transparent, ${props => Color(props.theme.background).alpha(0.2)});

  &:hover {
    box-shadow: ${props => props.theme.background} 0 2px 10px 0;
  }
`

const Name = styled.p.attrs({ className: 'item-name' })`
  font-size: 12px;
  color: ${props => props.theme.color};
`

const Number = styled.p.attrs({ className: 'item-number' })`
  font-size: 18px;
`

const Detail = styled.p.attrs({ className: 'item-detail' })`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;

  span:first-of-type {
    margin-right: 5px
  }
`

export { Section, Name, Number, Detail }
