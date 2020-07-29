import styled from "styled-components";

const Section = styled.div.attrs({ className: 'section-item' })`
  width: 100px;
  height: 80px;
  border-radius: 5px;
  background-color: ${props => props.theme.background};
  color: ${props => props.theme.color};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 4px;
`

const Name = styled.p.attrs({ className: 'item-name' })`
  font-size: 14px;
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