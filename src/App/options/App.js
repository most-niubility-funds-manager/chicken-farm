import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Route, Switch, useHistory } from "react-router-dom";
import routes from "./router";
import "./assets/scss/reset.scss";
import "./assets/scss/theme.scss";
import Nav from "./views/nav";
import Head from "./views/head";

const Wrapper = styled.div.attrs({ className: "wrapper" })`
	width: 100vw;
	height: 100vh;
	overflow: hidden;
	background-color: var(--main-background);
	color: var(--main-font);
	display: grid;
	grid-template-columns: 300px 1fr;
`;

const Main = styled.div.attrs({ className: "main" })`
	width: 100%;
	height: 100%;
	overflow: auto;

	.content {
		width: 800px;
		margin: 0 auto;
		padding: 10px 5px 15px;
	}
`;

const App = () => {
	const [update, setUpdate] = useState(false)
	const history = useHistory();
	const commandMap = new Map([
		["forceLogin", () => redirectLogin()],
		["jumpIndex", () => redirectHome()],
	]);

	// 交互监听中心
	chrome.runtime.onMessage.addListener((message) => {
		const { command } = message;

		commandMap.get(command)();

		return true;
	});

	// 跳转登录
	const redirectLogin = () => history.replace("/login");
	const redirectHome = () => {
		history.replace("/welcome")
		setUpdate(true)
		setTimeout(() => {
			setUpdate(false)
		})
	};

	return (
		<Wrapper className="normal">
			<Nav />
			<Main>
				<Head update={update} />
				<div className="content">
					<Switch>
						{routes.map((route) => (
							<Route key={route.path} path={route.path} component={route.component} exact />
						))}
					</Switch>
				</div>
			</Main>
		</Wrapper>
	);
};

export default App;
