import styled from "styled-components"

const Wrapper = styled.div`
  padding: 10px;
  width: 100%;
  height: 100%;
  overflow: overlay;
`

const Paragraph = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${props => props.theme.normal};
  margin-bottom: 10px;
`

export { Wrapper, Paragraph }