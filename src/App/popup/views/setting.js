/*
 * @Date: 2020-10-18 19:53:03
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-20 21:43:43
 * @Description: 个人设置页
 */
import React, { useState } from "react";
import styled from "styled-components";
import { setSettingState, clearUserInfo } from "../services";
import Item from "../components/setting/item";

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
	font-size: 16px;
	font-weight: 500;
	color: var(--setting-title);
	cursor: pointer;
	margin-bottom: 20px;

	i {
		font-size: 16px;
		color: var(--setting-title);
		margin-right: 4px;
	}
`;

const Block = styled.div`
	width: 100%;
	height: auto;
	border-radius: 6px;
	background-color: var(--setting-block-bg);
	margin-bottom: 20px;
	padding: 12px 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 20px;
`;

const LoginOutBlock = styled.div`
	width: 100%;
	height: 44px;
	border-radius: 6px;
	background-color: var(--setting-block-bg);
	font-size: 13px;
	color: var(--setting-block);
	padding: 0 18px;
	display: flex;
	align-items: center;
	cursor: pointer;

	.name {
		color: var(--setting-username);
	}
`;

const Setting = (props) => {
	const { active, data, user } = props;
	const { reverseColor, tradeNotice, marketState, incomeState } = data;

	const closeHandler = () => setSettingState(false);

	return (
		<Wrapper className={active && "active"}>
			<Title onClick={closeHandler}>
				<i className="iconfont chicken-arrow-left"></i>
				功能设置
			</Title>
			<Block>
				<Item text="涨跌颜色反转" active={reverseColor} keyName="reverseColor"></Item>
				<Item text="每日交易提醒" active={tradeNotice} keyName="tradeNotice"></Item>
				<Item text="开启/关闭大盘数据" active={marketState} keyName="marketState"></Item>
				<Item text="开启/关闭收益面板" active={incomeState} keyName="incomeState"></Item>
			</Block>
			<LoginOutBlock onClick={clearUserInfo}>
				退出账号 <span className="name">（当前登录：{user ? user.name : ''}）</span>
			</LoginOutBlock>
		</Wrapper>
	);
};

export default Setting;
