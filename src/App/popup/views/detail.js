import React, { useState } from "react";
import styled from "styled-components";
import { setDetailState } from "../services";

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 16px 8px 0;
	background-color: var(--setting-bg);
	transform: translateX(100%);
	transition: all 0.18s linear;
	z-index: 1;

	&.active {
		transform: translateX(0);
	}
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	color: var(--setting-title);

	margin-bottom: 20px;

	.title {
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;

		i {
			font-size: 16px;
			color: var(--setting-title);
			margin-right: 4px;
		}
	}
`;

const Detail = (props) => {
	const { active, code } = props;

	const closeHandler = () => setDetailState(false);

	return (
		<Wrapper className={active && "active"}>
			<Title onClick={closeHandler}>
				<div className="title">
					<i className="iconfont chicken-arrow-left"></i>
					产品详情
				</div>
			</Title>
		</Wrapper>
	);
};

export default Detail;
