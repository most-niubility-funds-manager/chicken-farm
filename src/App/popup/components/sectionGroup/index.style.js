import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: 'section-group' })`
  width: 100%;
  height: 80px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 20px;
`

export { Wrapper }