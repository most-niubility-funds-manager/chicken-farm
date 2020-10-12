import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllFundCodes, getUserTableHead } from "../../services";
import Head from "./tableHead";
import Item from "./tableItem";

const Wrapper = styled.div.attrs({ className: "content" })`
	width: 100%;
	height: 420px;
	overflow: auto;
`;

const List = styled.div.attrs({ className: "list" })`
	width: 100%;
	height: auto;
`;

const Content = (props) => {
	const { user } = props;
	const [codes, setCodes] = useState([]);
	const [headConfig, setHeadConfig] = useState([]);
	const [update, setUpdate] = useState(false);

	const listener = (message) => {
		const { command, data = null } = message;
		const commandMap = new Map([
			[
				"forceUpdate",
				(data) => {
					setUpdate(data);
					setTimeout(() => setUpdate(false));
				},
			],
		]);

		commandMap.get(command)(data);

		return true;
	};

	useEffect(() => {
		chrome.runtime.onMessage.addListener(listener);
		return () => {
			chrome.runtime.onMessage.removeListener(listener);
		};
	}, []);

	useEffect(() => {
		const fetchData = async () => {
			const codes = await getAllFundCodes(user.uid);
			const head = await getUserTableHead();
			setCodes(codes);
			setHeadConfig(head);
		};

		user && fetchData();
		console.log("刷星", update);
	}, [user, update]);

	return (
		<Wrapper>
			<Head config={headConfig}></Head>
			<List>
				<Item></Item>
			</List>
		</Wrapper>
	);
};

export default Content;
