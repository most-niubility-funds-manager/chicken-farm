import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: "wrapper" })`
	width: 500px;
	height: 500px;
	background-color: ${(props) => props.theme.background};
	position: relative;
	overflow: hidden;
	will-change: width;

	&.heightLimit {
		min-height: 500px;
	}

	&.wideScreen {
		width: 672px;
	}
`;

const Content = styled.div.attrs({ className: "content" })`
	height: calc(100% - 36px);
`;

export { Wrapper, Content };
