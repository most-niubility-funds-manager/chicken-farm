import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { syncOldData } from '../../services'

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
	height: 170px;
	border-radius: 6px;
	background-color: var(--detail-sync-bg);
	padding: 15px 20px;
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
	color: var(--detail-sync-title);

	i {
		font-size: 14px;
		color: var(--detail-sync-icon);
		cursor: pointer;
	}
`;

const InputBox = styled.div`
	width: 100%;
	height: 40px;
	border-radius: 6px;
	background-color: var(--detail-sync-input-bg);
	color: var(--detail-sync-label);
	font-size: 13px;
	margin-bottom: 16px;

	input {
		width: 100%;
		height: 100%;
		background-color: transparent;
		font-size: 13px;
    color: var(--detail-sync-input);
    padding: 0 10px;
	}
`;

const Footer = styled.button`
	width: 100%;
	height: 40px;
	color: var(--detail-sync-btn);
	background-color: var(--detail-sync-btn-bg);
	font-size: 13px;
	border-radius: 6px;
	margin-top: auto;
	cursor: pointer;
`;

const SyncData = ({ user, active, closeEvent }) => {
  const inputEl = useRef(null);

  const submitOldData = async () => {
    const { uid } = user
    const { value } = inputEl.current;
		const reg = /#(.*)#/g;
		const str = reg.exec(value);

    if (!str) return 

    const funds = JSON.parse(str[1]);
    const status = await syncOldData({ uid, data: funds })

    status && closeHandler()
  }

  const closeHandler = () => {
    inputEl.current.value = ""
    closeEvent()
  }

	return (
		<Wrapper>
			<Mask className={active && "active"} onClick={closeHandler}></Mask>
			<Content className={active && "active"}>
				<Head>
					<span>导入数据</span>
					<i className="iconfont chicken-close" onClick={closeHandler}></i>
				</Head>
				<InputBox>
					<input ref={inputEl} placeholder="粘贴至此处" />
				</InputBox>
				<Footer onClick={submitOldData}>立即同步</Footer>
			</Content>
		</Wrapper>
	);
};

export default SyncData;
