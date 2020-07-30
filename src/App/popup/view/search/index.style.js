import styled, { keyframes } from "styled-components";

const Wrapper = styled.div.attrs({ className: "search-wrapper" })`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 1;
`;

const fadeAnimate = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1
  }
`;

const Mask = styled.div.attrs({ className: "search-mask" })`
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(2px);
	animation: ${fadeAnimate} 0.2s ease-out forwards;
`;

const slideUpAnimate = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0)
  }
`;

const Content = styled.div.attrs({ className: "search-content" })`
	position: absolute;
	bottom: 0;
	left: 0;
	transform: translateY(100%);
	width: 100%;
	max-height: 100%;
	padding: 20px;
	border-radius: 5px 0 0 5px;
	background-color: ${(props) => props.theme.searchPageBg};
	box-shadow: ${(props) => props.theme.searchShadow} 0 -4px 10px 0;
	will-change: transform, height;
	backface-visibility: hidden;
	transition: all 0.2s ease-out;
	animation: ${slideUpAnimate} 0.2s ease-out forwards;
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

const backgroundAnimate = (beforeColor, afterColor) => keyframes`
  from {
    background-color: ${beforeColor};
  }
  to {
    background-color: ${afterColor};
  }
`;

const ErrorPanel = styled.div.attrs({ className: "error-panel" })`
	width: 100%;
	padding: 5px 10px;
	border-radius: 2px;
	border: 1px solid ${(props) => props.theme.errorBorder};
	color: ${(props) => props.theme.normal};
	font-size: 12px;
	line-height: 1.5;
	margin-bottom: 15px;
	animation: ${(props) => backgroundAnimate(props.theme.errorBgAnimate, props.theme.errorBg)} 0.2s
		ease-out forwards;
`;

const ListWrapper = styled.div.attrs({ className: "list-wrapper" })`
	max-height: calc(100% - 77px);
	overflow: overlay;
	margin-bottom: 15px;
	font-size: 12px;

  &.isError {
	  max-height: calc(100% - 123px);
  }
`;

const ListItem = styled.div.attrs({ className: "list-item" })`
	width: 100%;
	height: 50px;
	display: grid;
	grid-template-columns: 80px 1fr 100px;
	margin-bottom: 10px;
	font-size: 14px;
	line-height: 50px;
	background-color: ${(props) => props.theme.listBg};
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	color: ${(props) => props.theme.normal};
`;

const BtnBox = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Btn = styled.button`
	padding: 6px 14px;
	border-radius: 4px;
	background-color: ${(props) => props.theme.addBtn};
	color: ${(props) => props.theme.normal};
	font-size: 12px;
	cursor: pointer;

	&.disabled {
		background-color: ${(props) => props.theme.addBtnDisabled};
		cursor: not-allowed;
		pointer-events: none;
	}
`;

const Tips = styled.p.attrs({ className: "tip" })`
	text-align: left;
	font-size: 12px;
	color: ${(props) => props.theme.searchTip};
	line-height: 1.5;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const LoadingWrapper = styled.div.attrs({ className: "loading-wrapper" })`
	width: 100%;
	height: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

export {
	Wrapper,
	Mask,
	Content,
	CloseBtn,
	Title,
	ErrorPanel,
	ListWrapper,
	ListItem,
	BtnBox,
	Btn,
	Tips,
	LoadingWrapper,
};
