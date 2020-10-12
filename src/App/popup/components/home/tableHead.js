import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: "table-head" })`
	width: 100%;
	height: 40px;
	display: grid;
	grid-template-columns: 200px 1fr 1fr 1fr 1fr;
	border-bottom: 1px solid var(--table-tr-border);

	.item {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		font-size: 13px;
		color: var(--table-th);
		padding-left: 20px;
    
    .sub {
			font-size: 12px;
			color: var(--table-th-sub);
			transform: scale(0.9);
			transform-origin: left;
    }
	}
`;

const Head = (props) => {
	const { config } = props;
	const headList = () => config.map(({ name, key, sub }) => (
		<div className="item" key={key}>
			<span>{name}</span>
			{sub && <span className="sub">{sub}</span>}
		</div>
	));

	return (
		<Wrapper>
			<div className="item">基金名称</div>
			{headList()}
		</Wrapper>
	);
};

export default Head;
