import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: 'table-list-item' })`
	width: 100%;
	height: auto;
	padding: 8px 0;
	display: grid;
	grid-template-columns: 200px 1fr 1fr 1fr 1fr;
	color: var(--table-tr);
	position: relative;
	transition: all 0.18s linear;

	&::before {
		content: "";
		position: absolute;
		bottom: 0;
		left: 50%;
		transform: translateX(-50%);
		width: calc(100% - 10px);
		height: 1px;
		background-color: var(--table-tr-border);
	}
`

const FundTitle = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	font-size: 12px;
	padding-left: 20px;

	p {
		white-space: pre-wrap;
	}

	.detail {
		color: var(--table-tr-detail);

		.tag {
			
		}
	}
`

const FundCell = styled.div`
	width: 100%;
	display: flex;
	flex-direction: column;
	font-size: 12px;
	line-height: 1.3;
	padding-left: 20px;

	.top {
		font-weight: 500;
	}

	.bottom {
		transform: scale(0.9);
		transform-origin: left;
	}
`

const Item = () => {
	return (
		<Wrapper>
			<FundTitle>
				<p>招商中证白酒指数指数C</p>
				<p className="detail">010020</p>
			</FundTitle>
			<FundCell>
				<p className="top">+3.12%</p>
				<p className="bottom">1.12312</p>
			</FundCell>
			<FundCell>
				<p className="top">+3.12%</p>
				<p className="bottom">1.12312</p>
			</FundCell>
			<FundCell>
				<p className="top">+3.12%</p>
				<p className="bottom">1.12312</p>
			</FundCell>
			<FundCell>
				<p className="top">+3.12%</p>
				<p className="bottom">1.12312</p>
			</FundCell>
		</Wrapper>
	)
};

export default Item;
