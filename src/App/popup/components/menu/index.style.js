import styled, {keyframes} from 'styled-components'

const popIn = keyframes`
  from {
    transform: scale(0);
  }
  to {
    transform: scale(1);
  }
`

const popOut = keyframes`
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
`

const Wrapper = styled.div.attrs({ className: 'setting-menu' })`
  width: 200px;
  height: auto;
  position: absolute;
  bottom: 40px;
  right: 4px;
  padding: 4px 0;
  background-color: rgb(35 40 45);
  border-radius: 4px;
  //box-shadow: rgba(255,255,255, 0.05) 0px 0px 0px 1px, rgba(255,255,255, 0.1) 0px 3px 6px, rgba(255,255,255, 0.2) 0px 9px 24px;
  transform: scale(0);
  animation: ${popIn} 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.065) forwards;
  transform-origin: right bottom;
  z-index: 10;

  &.cancel {
    animation: ${popOut} 0.2s ease-out forwards;
  }
`

const ListItem = styled.div`
  height: 36px;
  padding: 0 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: background 0.2s ease-in;

  i {
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 8px;
    font-size: 17px;
    
    svg {
      fill: #fff;
    }
  }
  span {
    font-size: 14px;
    margin-right: auto;
  }

  &:hover {
    background-color: hsl(207 14% 10% / 1);
  }
`

export { Wrapper, ListItem }
