import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: 'tabel-wrapper' })`
  width: 100%;
  max-height: 360px;
  position: relative;
  overflow: overlay;
  margin-bottom: 20px;

  &.loading {
    min-height: 120px;
  }
`
const LoadingWrapper = styled.div`
  width: 100%;
  height: 120px;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.tbodyBg};
  z-index: 10;
`

export { Wrapper, LoadingWrapper }
