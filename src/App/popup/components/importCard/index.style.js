import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div.attrs({ className: 'card-wrapper' })`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`

const fadeIn = keyframes`
  from {
    backdrop-filter: blur(0)
  }
  to {
    backdrop-filter: blur(12px);
  }
`
const fadeOut = keyframes`
  from {
    backdrop-filter: blur(12px);
  }
  to {
    backdrop-filter: blur(0);
  }
`

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: transparent;
  animation: ${fadeIn} 0.2s ease forwards;

  &.cancel {
    animation: ${fadeOut} 0.2s ease forwards;
  }
`

const popIn = keyframes`
  from {
    transform: scale(0) translate(-50%, -50%);
  }
  to {
    transform: scale(1) translate(-50%, -50%);
  }
`
const popOut = keyframes`
  from {
    transform: scale(1) translate(-50%, -50%);
  }
  to {
    transform: scale(0) translate(-50%, -50%);
  }
`

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 450px;
  height: 200px;
  border-radius: 5px;
  transform-origin: center center;
  background-color: #000;
  animation: ${popIn} 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.075) forwards;

  &.cancel {
    animation: ${popOut} 0.2s ease forwards;
  }
`

export { Wrapper, Mask, Content }