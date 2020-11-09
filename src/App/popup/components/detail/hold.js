// 持有弹窗
import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { setFundHold, modifyHold } from "../../services";

const slideUp = keyframes`
  0% {
		top: 0;
    opacity: 0;
	}
	10% {
		top: 40%;
		opacity: 0;
	}
  100% {
		top: 50%;
    opacity: 1;
  }
`;

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
`;

const Mask = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(0px);
	transition: all 0.2s linear;
	will-change: backdrop-filter;
	pointer-events: none;

	&.active {
		backdrop-filter: blur(5px);
		pointer-events: auto;
	}
`;

const Content = styled.div`
	position: fixed;
	top: 0;
	left: 50%;
	width: 255px;
	height: 270px;
	border-radius: 6px;
	background-color: var(--detail-hold-bg);
	padding: 15px 20px 30px;
	opacity: 0;
	transform: translate(-50%, -50%);
	pointer-events: none;

	&.active {
		animation: ${slideUp} 0.18s linear 0.5s forwards;
		pointer-events: auto;
	}
`;

const Head = styled.div`
	width: 100%;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 15px;
	color: var(--detail-hold-title);

	i {
		font-size: 14px;
		color: var(--detail-hold-icon);
		cursor: pointer;
	}
`;

const Body = styled.div`
	width: 100%;
	height: 160px;
	overflow: hidden;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
`;

const CurrentCost = styled.p`
	font-size: 12px;
	color: var(--detail-hold-cost);
	text-align: left;
	margin-bottom: 16px;
`;

const Label = styled.label`
	width: 100%;
	height: 40px;
	border-radius: 6px;
	background-color: var(--detail-hold-input-bg);
	color: var(--detail-hold-label);
	padding: 0 10px;
	font-size: 13px;
	margin-bottom: 16px;

	input {
		width: 150px;
		height: 100%;
		background-color: transparent;
		font-size: 13px;
		color: var(--detail-hold-input);
	}
`;

const Button = styled.button`
	width: 100%;
	height: 40px;
	color: var(--detail-hold-btn);
	background-color: var(--detail-hold-btn-bg);
	font-size: 13px;
	border-radius: 6px;
	margin-top: auto;
	cursor: pointer;
`;

const HoldPage = (props) => {
	const { active, data, closeEvent } = props;
	const costEl = useRef(null);
	const unitEl = useRef(null);

	const submitHoldHandler = async () => {
		const { uid, code } = data;
		const cost = costEl.current.value;
		const unit = unitEl.current.value;

		if (cost < 0 || unit < 0) return;

		await setFundHold({ uid, code, cost, unit });
		modifyHold(uid);
		closeEvent();
	};

	useEffect(() => {
		const { cost, unit } = data;
		costEl.current.value = cost;
		unitEl.current.value = unit;
	}, []);

	return (
		<Wrapper>
			<Mask className={active && "active"} onClick={closeEvent}></Mask>
			<Content className={active && "active"}>
				<Head>
					<span>修改持有</span>
					<i className="iconfont chicken-close" onClick={closeEvent}></i>
				</Head>
				<CurrentCost>当前持有：{data.cost || 0} 份</CurrentCost>
				<Body>
					<Label>
						净值：
						<input type="number" ref={unitEl} placeholder="持仓成本价" />
					</Label>
					<Label>
						份额：
						<input type="number" ref={costEl} placeholder="持有份额" />
					</Label>
					<Button onClick={submitHoldHandler}>确认</Button>
				</Body>
			</Content>
		</Wrapper>
	);
};

export default HoldPage;
