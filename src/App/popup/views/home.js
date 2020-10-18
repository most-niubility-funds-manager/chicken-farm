import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Market from "../components/home/market";
import Income from "../components/home/income";
import Content from "../components/home/content";
import Search from "./search";
import Nav from "../components/home/nav";
import { getUserInfo } from "../services";

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

const Home = () => {
	const [user, setUser] = useState(null);
	const [searchActive, setSearchActive] = useState(false);
	const [update, setUpdate] = useState(false);
	const [tableType, setTableType] = useState(false);
	const [searchData, setSearchData] = useState([]); //	获取搜搜哦结果

	// 顶部框
	const renderTopPanelJSX = () => {
		if (!tableType) {
			return <Market />;
		} else {
			return <Income />;
		}
	};

	// 主体切换
	const renderBodyJSX = () => {
		if (!searchActive) {
			return (
				<HomeWrapper>
					{renderTopPanelJSX()}
					<Content user={user} forceUpdate={update} tableType={tableType} />
				</HomeWrapper>
			);
		} else {
			return <Search user={user} data={searchData} />;
		}
	};

	// 首页监听背景页交互响应
	const onMessageListener = (message) => {
		const { command, data = null } = message;
		const commandMap = new Map([
			[
				"forceUpdate",
				() => {
					setUpdate(true);
					setTimeout(() => setUpdate(false));
				},
			],
			["changeListType", (data) => setTableType(data)],
			[
				"setSearchState",
				(data) => {
					!data && setSearchData([]);
					setSearchActive(data);
				},
			],
			["setSearchData", (data) => setSearchData(data)],
		]);

		commandMap.get(command)(data);

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
		setUser(info);
	}, []);

	return (
		<Wrapper>
			<Nav></Nav>
			{renderBodyJSX()}
		</Wrapper>
	);
};

export default Home;
