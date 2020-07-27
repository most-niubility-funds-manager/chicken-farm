import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: 'footer' })`
  width: 100%;
  height: 36px;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  background-color: ${props => props.theme.footer};
  color: ${props => props.theme.normal};
`

const StateBox = styled.div.attrs({ className: 'state-box' })`
  width: 60px;
  height: 24px;
  font-size: 12px;
  color: ${props => props.theme.normal};
  text-align: center;
  line-height: 2;
  border-radius: 2px;
  background-color: ${props => props.isOpen ? props.theme.field : props.theme.status}
`

export { Wrapper, StateBox }
