import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: "wrapper" })`
  width: 500px;
  max-height: 700px;
  background-color: ${props => props.theme.background};
  padding-top: 20px;
`

const Content = styled.div.attrs({ className:'content' })`
  padding: 0 20px;
`

export { Wrapper, Content }