import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Intro from "./introduce";
import Glossary from './glossary'

const Wrapper = styled.div`
	width: 1000px;
	height: auto;
	margin: 0 auto;
`;

const Content = () => {
	return (
		<Wrapper>
			<Intro title="添加基金" />
			<Glossary title="名词解释" />
		</Wrapper>
	);
};

export default Content;
