/*
 * @Date: 2020-10-08 21:00:33
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-11 19:55:07
 * @Description: 搜索页面
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SearchBox from "../components/search/input";
import Item from "../components/search/item";
import { searchFund } from "../services";

const Wrapper = styled.div.attrs({ className: "search" })`
	position: absolute;
	top: 100%;
	left: 0;
	width: 100%;
	height: 0;
	background-color: var(--search-bg);
	transition: all 0.2s ease;
	display: grid;
	grid-template-rows: 40px 51px 1fr;
	transform: translateY(100%);
	overflow: hidden;
	opacity: 0;

	&.open {
		height: 100%;
		padding: 20px;
		transform: translateY(-100%);
		opacity: 1;
	}

	.title {
		height: 28px;
		font-size: 16px;
		color: var(--search-title);
		display: flex;
		align-items: center;
		justify-content: space-between;

		i {
			font-size: 20px;
			cursor: pointer;
		}
	}
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
	overflow: auto;

	.list {
		width: 100%;
		height: auto;
	}
`;

const Empty = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--search-empty);
`;

const Search = (props) => {
	const { closeEvent, active, user } = props;
	const [result, setResult] = useState([]);

	const searchEvent = async (k) => {
		const data = await searchFund(k);
		setResult([...data]);
	};

	useEffect(() => {
		setResult([]);
	}, [active]);

	const renderContentJSX = () =>
		result.length ? (
			<div className="list">
				{result.map((v) => (
					<Item key={v.id} fund={v} user={user} />
				))}
			</div>
		) : (
			<Empty>暂无搜索结果</Empty>
		);

	return (
		<Wrapper className={active && "open"}>
			<div className="title">
				<b>基金搜索:</b>
				<i className="iconfont chicken-close" onClick={closeEvent}></i>
			</div>
			<SearchBox active={active} searchEvent={searchEvent} />
			<Content>{renderContentJSX()}</Content>
		</Wrapper>
	);
};

export default Search;
