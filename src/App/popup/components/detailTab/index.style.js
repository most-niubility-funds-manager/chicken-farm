import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: 'tab-wrapepr' })`
  width: 100%;
  height: calc(100% - 50px);
  margin-bottom: 20px;
`

const Content = styled.div.attrs({ className: 'tab-content' })`
  width: 100%;
  height: calc(100% - 70px);
`

export { Wrapper, Content }
