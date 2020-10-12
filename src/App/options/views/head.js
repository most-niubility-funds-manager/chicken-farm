import React, { useState, useEffect } from "react";
import styled from "styled-components";
import LoginStatus from "../hooks/userInfo";
import { loginOut, forceLogin } from "../service/user";

const Wrapepr = styled.div.attrs({ className: "header" })`
	width: 100%;
	height: 50px;
	font-size: 14px;
	padding: 0 25px;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const LoginBlock = styled.div.attrs({ className: "login" })`
	height: 100%;
	display: flex;
	align-items: center;

	p {
		padding: 0 5px;
		color: var(--head-font-hover);

		&:hover {
			background-color: var(--head-bg-hover);
		}
	}

	span {
		color: var(--head-font);
		cursor: pointer;
		&:hover {
			color: var(--head-font-hover);
		}
	}
`;

const Head = (props) => {
	const { update } = props;
	const userInfo = LoginStatus(update);

	// 切换登陆状态
	const switchLoginStatus = () => {
		loginOut();
		forceLogin();
	};

	// 昵称状态
	const nickName = userInfo ? `Hi~ ${userInfo.name}` : "无用户";
	const btnText = userInfo ? "切换账户" : "登录";

	return (
		<Wrapepr>
			<LoginBlock>
				<p>{nickName}</p>
				<span onClick={switchLoginStatus}>{btnText}</span>
			</LoginBlock>
		</Wrapepr>
	);
};

export default Head;
