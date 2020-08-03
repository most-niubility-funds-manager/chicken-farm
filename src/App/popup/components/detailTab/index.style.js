import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: 'tab-wrapepr' })`
  width: 100%;
  height: calc(100% - 200px);
`

const Content = styled.div.attrs({ className: 'tab-content' })`
  width: 100%;
  height: calc(100% - 60px);
  //background-color: ${props => props.theme.tabNavBg};
`

export { Wrapper, Content }
