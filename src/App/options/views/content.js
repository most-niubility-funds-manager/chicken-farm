import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Intro from "./introduce";

const Wrapper = styled.div`
	width: 1200px;
	height: auto;
	margin: 0 auto;
`;

const Content = () => {
	return (
		<Wrapper>
			<Intro title="功能介绍" />
		</Wrapper>
	);
};

export default Content;
