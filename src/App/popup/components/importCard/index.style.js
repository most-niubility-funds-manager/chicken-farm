import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div.attrs({ className: 'card-wrapper' })`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  backface-visibility: hidden;
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
  will-change: backdrop-filter;

  &.cancel {
    animation: ${fadeOut} 0.2s ease forwards;
  }
`

const popIn = keyframes`
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
`
const popOut = keyframes`
  from {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
  to {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
`

const Content = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 450px;
  border-radius: 5px;
  opacity: 0;
  transform: translate(-50%, -40%);
  background-color: ${props => props.theme.importCardBg};
  animation: ${popIn} 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.075) forwards;
  padding: 20px;
  will-change: opacity transform;

  &.cancel {
    animation: ${popOut} 0.2s ease forwards;
  }
`

const Title = styled.div`
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: ${props => props.theme.importCardBtn};
  text-align: left;
  margin-bottom: 20px;
`

const Input = styled.input`
  width: 100%;
  height: 36px;
  border-radius: 2px;
  margin-bottom: 20px;
  background-color: ${props => props.theme.importCardBg};
  border: 1px solid #333;
  color: ${props => props.theme.importCardBtn};
  padding: 0 1em;
`

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BtnGroup = styled.div`
  display: flex;
  align-items: center;
`

const Btn = styled.button`
  padding: 4px 6px;
  border-radius: 2px;
  font-size: 12px;
  color: ${props => props.theme.importCardBtn};
  background-color: ${props => props.theme.importCardBtnBg};
  margin-left: 10px;
  cursor: pointer;

  &.primary {
    background-color: ${props => props.theme.importCardBtnDoneBg};
  }
`
 
export { Wrapper, Mask, Content, Title, Input, Footer, BtnGroup, Btn }