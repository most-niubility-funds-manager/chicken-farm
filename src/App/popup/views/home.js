import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Market from "../components/home/market";
import Footer from "../components/home/footer";
import Content from "../components/home/content";
import { getUserInfo, forceUpdate } from "../services";
import Search from "./search";

const Wrapper = styled.div.attrs({ className: "wrapper" })`
	width: 650px;
	height: 520px;
	background-color: var(--home-bg);
	position: relative;
	overflow: hidden;
`;

const HomeWrapper = styled.div.attrs({ className: "home" })`
	width: 100%;
	height: 100%;
`;

const Home = () => {
	const [user, setUser] = useState(null);
	const [searchActive, setSearchActive] = useState(false);

	useEffect(async () => {
		const info = await getUserInfo();
		setUser(info);
	}, []);

	// 搜索页开关
	const searchOpenHandler = () => setSearchActive(true);
	const searchCloseHandler = () => {
		setSearchActive(false);
		forceUpdate()
	}

	return (
		<Wrapper>
			<HomeWrapper>
				<Market />
				<Content user={user} />
				<Footer user={user} search={searchOpenHandler} />
			</HomeWrapper>
			{/* 搜索 */}
			<Search user={user} active={searchActive} closeEvent={searchCloseHandler} />
		</Wrapper>
	);
};

export default Home;
