import styled, { keyframes } from "styled-components";

const Wrapper = styled.div.attrs({ className: "operation-wrapper" })`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10;
`;

const Mask = styled.div.attrs({ className: "operation-mask" })`
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
  background-color: rgb(0 0 0 / 0.5);
  backdrop-filter: blur(12px);
  opacity: 1;
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

const Content = styled.div.attrs({ className: "operation-content" })`
	position: absolute;
	bottom: 0;
	left: 0;
	transform: translateY(100%);
	width: 100%;
	height: 500px;
	padding: 20px;
	border-radius: 5px 0 0 5px;
	will-change: transform, height;
	backface-visibility: hidden;
	transition: all 0.2s ease-out;
	animation: ${slideUp} 0.2s ease-out forwards;

	&.cancel {
		animation: ${slideOut} 0.2s ease-in forwards;
	}
`;

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

export { Wrapper, Mask, Content, CloseBtn, Title };
