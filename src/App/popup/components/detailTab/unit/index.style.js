import styled, { keyframes } from "styled-components";

const animateWidth = width => keyframes`
	from {
		width: 0;
	}
	to {
		width: ${width}%;
	}
`

const Wrapper = styled.div.attrs({ className: "unit-wrapper" })`
	width: 100%;
	height: 100%;
	padding: 10px;
	overflow: overlay;
`;

const Box = styled.div`
	width: 100%;
	height: 40px;
	margin-bottom: 10px;
	position: relative;
	background-color: ${props => props.theme.searchPageBg};
`;

const BoxBg = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	height: 40px;
	background-color: ${(props) => (props.type ? props.theme.increaseBg : props.theme.decreaseBg)};
	animation: ${props => animateWidth(props.width)} 0.5s ease-out forwards;
	will-change: width;
`;

const BoxContent = styled.div`
	position: absolute;
	top: 0;
	left: 0%;
	width: 100%;
	height: 40px;
	background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: ${props => props.theme.normal};
	padding: 0 10px;
`;

export { Wrapper, Box, BoxBg, BoxContent }