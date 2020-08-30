import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: 'tabel-wrapper' })`
  width: ${props => props.wide ? '672px' : '500px'};
  will-change: width;
  height: 392px;
  position: relative;
  overflow: auto;

  &.loading {
    min-height: 120px;
    overflow: hidden;
  }
`
const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.theme.tbodyBg};
  z-index: 5;
`

const EmptyFund = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 392px;
  color: ${props => props.theme.normal};
  background-color: ${props => props.theme.tbodyBg};
  font-size: 14px;
  z-index: 5;
`

export { Wrapper, LoadingWrapper, EmptyFund }
