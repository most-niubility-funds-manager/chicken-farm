import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div`
  position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
`
const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1
  }
`;

const fadeOut = keyframes`
from {
  opacity: 1
}
to {
  opacity: 0;
}
`;

const Mask = styled.div.attrs({ className: "delete-mask" })`
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(2px);
	animation: ${fadeIn} 0.2s ease-out forwards;

  &.cancel {
    animation: ${fadeOut} 0.2s ease-out forwards;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0)
  }
`;

const slideOut = keyframes`
	from {
		transform: translateY(0)
	}
	to {
		transform: translateY(100%);
	}
`;

const Content = styled.div`
  position: absolute;
	bottom: 0;
	left: 0;
	transform: translateY(100%);
	width: 100%;
	height: 160px;
	padding: 20px;
	background-color: ${(props) => props.theme.searchPageBg};
	box-shadow: ${(props) => props.theme.searchShadow} 0 -4px 10px 0;
	will-change: transform, height;
	backface-visibility: hidden;
	transition: all 0.2s ease-out;
	animation: ${slideUp} 0.2s ease-out forwards;

  &.cancel {
    animation: ${slideOut} 0.2s ease-out forwards;
  }
`

const CloseBtn = styled.i`
	position: absolute;
	top: 20px;
	right: 20px;
	width: 20px;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: center;
	color: ${(props) => props.theme.normal};
	font-size: 20px;
	cursor: pointer;
`;

const Title = styled.div`
	text-align: left;
	color: ${(props) => props.theme.normal};
	font-size: 16px;
	height: 30px;
	font-weight: bold;
	margin-bottom: 15px;
`;

const Description = styled.p`
  font-size: 14px;
  color: ${props => props.theme.normal};
  line-height: 1.5;
  margin-bottom: 15px;
  span {
    color: ${props => props.theme.deleteDescCode};
    font-size: 14px;
    font-weight: bold;
  }
`

const Group = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  button {
    width: 50px;
    height: 32px;
    background-color: #000;
    color: ${props => props.theme.deleteDoneColor};
    background-color:${props => props.theme.deleteDoneBg};
    border-radius: 4px;
    cursor: pointer;
    margin-left: 10px;

    &.cancel {
      color: ${props => props.theme.deleteCancelColor};
      background-color:${props => props.theme.deleteCancelBg};
    }
  }
`

export { Wrapper, Mask, Content, CloseBtn, Title, Description, Group }
