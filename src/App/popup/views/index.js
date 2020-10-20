/*
 * @Date: 2020-10-16 18:17:52
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-20 21:17:51
 * @Description: 项目wrapper
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Home from "./home";
import Setting from "./setting";
import Detail from "./detail";
import LoginPage from "./login";
import { getUserInfo, getUserLocalSetting, setBodyTheme } from "../services";

const Wrapper = styled.div.attrs({ className: "wrapper" })`
	width: 370px;
	height: 524px;
	background-color: var(--home-bg);
	position: relative;
	overflow: hidden;
	padding: 8px 8px 0;
`;

const App = () => {
	const [user, setUser] = useState({});
	const [settingActive, setSettingActive] = useState(false);
	const [detailActive, setDetailActive] = useState(false);
	const [currentFund, setCurrentFund] = useState("");
	const [userSetting, setUserSetting] = useState({});

	const onMessageListener = (message) => {
		const { command, data } = message;
		const commandMap = new Map([
			["setSettingState", (data) => setSettingActive(data)],
			[
				"setDetailState",
				({ state, code }) => {
					setDetailActive(state);
					setCurrentFund(code);
				},
			],
			["updateUserInfo", (data) => setUser(data)],
			["updateSetting", (data) => setUserSetting(data)],
		]);

		if (commandMap.get(command)) {
			commandMap.get(command)(data);
		}

		return true;
	};

	useEffect(() => {
		chrome.runtime.onMessage.addListener(onMessageListener);
		return () => {
			chrome.runtime.onMessage.removeListener(onMessageListener);
		};
	}, []);

	useEffect(async () => {
		const info = await getUserInfo();
		const settingConfig = await getUserLocalSetting();
		setUser(info);
		setUserSetting(settingConfig);
	}, []);

	useEffect(() => {
		setBodyTheme(userSetting.reverseColor);
	}, [userSetting]);

	return (
		<Wrapper>
			{/* 切换页面 */}
			<Home user={user} setting={userSetting}></Home>
			<Setting active={settingActive} data={userSetting} user={user}></Setting>
			<Detail active={detailActive} code={currentFund}></Detail>
			<LoginPage user={user}></LoginPage>
		</Wrapper>
	);
};

export default App;
