import styled from "styled-components";

const Layout = styled.div.attrs({ className: "layout" })`
	width: 100%;
  height: auto;
	margin-bottom: 40px;
`;

const Title = styled.h2`
	height: 60px;
	line-height: 60px;
	text-align: left;
	font-size: 36px;
	font-weight: bold;
`;

export { Layout, Title };
