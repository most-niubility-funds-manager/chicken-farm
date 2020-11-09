import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Market from "../components/home/market";
import Income from "../components/home/income";
import Content from "../components/home/content";
import Search from "./search";
import Nav from "../components/home/nav";

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1
	}
`;

const Wrapper = styled.div.attrs({ className: "wrapper" })`
	width: 100%;
	height: 100%;
	background-color: var(--home-bg);
	position: relative;
	overflow: hidden;
`;

const HomeWrapper = styled.div.attrs({ className: "home" })`
	width: 100%;
	height: auto;
	opacity: 0;
	animation: ${fadeIn} 0.18s linear 0.1s forwards;
`;

const Home = (props) => {
	const { user, setting, update } = props;
	const [searchActive, setSearchActive] = useState(false);
	const [tableType, setTableType] = useState(false);
	const [searchData, setSearchData] = useState([]); //	获取搜搜哦结果
	const [tempFollowCodes, setTempFollowCodes] = useState([]); //	临时存要关注的基金

	// 搜索结果的关注
	const searchDataSelectHandler = (idx, state) => {
		const data = [...searchData];
		data[idx].active = state;
		const codes = data.filter(({ active }) => active).map(({ code }) => code);
		setSearchData(data);
		setTempFollowCodes(codes);
	};

	// 顶部框
	const renderTopPanelJSX = () => {
		if (!tableType && setting.marketState) {
			return <Market />;
		} else if (tableType && setting.incomeState) {
			return <Income />;
		} else {
			return null;
		}
	};

	// 主体切换
	const renderBodyJSX = () => {
		if (!searchActive) {
			return (
				<HomeWrapper>
					{renderTopPanelJSX()}
					<Content user={user} update={update} tableType={tableType} setting={setting} />
				</HomeWrapper>
			);
		} else {
			return <Search user={user} data={searchData} follow={searchDataSelectHandler} />;
		}
	};

	// 首页监听背景页交互响应
	const onMessageListener = (message) => {
		const { command, data = null } = message;
		const commandMap = new Map([
			["changeListType", (data) => setTableType(data)],
			[
				"setSearchState",
				(data) => {
					!data && setSearchData([]);
					setSearchActive(data);
				},
			],
			["setSearchData", (data) => setSearchData(data.map((v) => ({ ...v, active: false })))],
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

	return (
		<Wrapper>
			<Nav searchActive={searchActive} user={user} followData={tempFollowCodes}></Nav>
			{renderBodyJSX()}
		</Wrapper>
	);
};

export default Home;
