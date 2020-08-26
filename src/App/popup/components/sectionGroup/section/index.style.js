import styled from "styled-components";

const Section = styled.div.attrs({ className: 'section-item' })`
  width: 100%;
  height: 40px;
  color: ${props => props.theme.crease};
  background-color: ${props => props.theme.background};
  display: grid;
  align-items: center;
  grid-template-columns: 50px 1fr;
  padding: 0 4px;
  cursor: pointer;
  transition: all 0.2s ease;
`

const Name = styled.div.attrs({ className: 'item-name' })`
  font-size: 12px;
  color: ${props => props.theme.color};
  text-align: center;
`

const Number = styled.p.attrs({ className: 'item-number' })`
  display: flex;
  align-items: center;
  height: 100%;
  font-size: 14px;
  font-weight: bold;
  text-align: left;
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
