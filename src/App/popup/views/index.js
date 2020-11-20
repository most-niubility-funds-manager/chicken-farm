/*
 * @Date: 2020-10-16 18:17:52
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-18 00:37:53
 * @Description: 项目wrapper
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Home from "./home";
import Setting from "./setting";
import Detail from "./detail";
import LoginPage from "./login";
import SyncDataTip from "../components/home/syncDataTip";
import DetailHold from "../components/detail/hold";
import SortPage from "./sort"
import { getUserInfo, getUserLocalSetting, setBodyTheme } from "../services";

const Wrapper = styled.div.attrs({ className: "wrapper" })`
	width: 370px;
	height: 524px;
	background-color: var(--home-bg);
	position: relative;
	overflow: hidden;
	padding: 16px 16px 0;

	&.wide {
		width: 550px;
	}
`;

const App = () => {
	const [user, setUser] = useState(null);
	const [settingActive, setSettingActive] = useState(false);
	const [detailData, setDetailData] = useState({});
	const [userSetting, setUserSetting] = useState({});
	const [loginActive, setLoginActive] = useState(false);
	const [holdActive, setHoldActive] = useState(false);
	const [holdData, setHoldData] = useState({});
	const [update, setUpdate] = useState(false); //	主动更新数据
	const [sortActive, setSortActive] = useState(false); //	排序页面

	const onMessageListener = (message) => {
		const { command, data } = message;
		const commandMap = new Map([
			["setSettingState", (data) => setSettingActive(data)],
			[
				"setDetailState",
				(data) => {
					setDetailData(data);
					!data.state && setUpdate(true);
				},
			],
			["updateUserInfo", (data) => setUser(data)],
			["updateSetting", (data) => setUserSetting(data)],
			["setLoginActive", (state) => setLoginActive(state)],
			[
				"setHoldState",
				({ state, data }) => {
					setHoldData(data);
					setHoldActive(state);
				},
			],
			["setSortState", (state) => setSortActive(state)],
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
		<Wrapper className={userSetting.wideMode && "wide"}>
			{/* 切换页面 */}
			<Home user={user} setting={userSetting} update={update}></Home>
			<Setting active={settingActive} data={userSetting} user={user}></Setting>
			<Detail user={user} data={detailData}></Detail>
			<LoginPage user={user} active={loginActive}></LoginPage>
			<SyncDataTip />
			<DetailHold data={holdData} active={holdActive} />
			<SortPage user={user} active={sortActive} />
		</Wrapper>
	);
};

export default App;
