/*
 * @Date: 2020-10-08 21:00:33
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-25 11:22:28
 * @Description: 搜索页面
 */
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { postFund, setLoginActive } from "../services";

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1
	}
`;

const Wrapper = styled.div.attrs({ className: "search" })`
	width: 100%;
	height: 470px;
	overflow: auto;
	opacity: 0;
	animation: ${fadeIn} 0.18s linear 0.1s forwards;
`;

const Item = styled.div`
	width: 100%;
	height: auto;
	padding: 8px;
	border-radius: 6px;
	background-color: var(--search-item-bg);
	display: grid;
	grid-template-columns: 1fr 60px 84px;
	margin-bottom: 8px;

	.first {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 4px;

		.top {
			color: var(--search-item);
			font-size: 13px;
			font-weight: 500;
		}
		.bottom {
			color: var(--search-item-code);
			font-size: 12px;
		}
	}

	.second {
		display: flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: center;
		gap: 4px;

		.top {
			color: var(--search-item);
			font-size: 13px;
		}
		.bottom {
			color: var(--search-item-code);
			font-size: 12px;
		}
	}

	.thrid {
		display: flex;
		align-items: center;
		justify-content: flex-end;

		button {
			width: 56px;
			height: 32px;
			border-radius: 6px;
			background-color: var(--search-item-btn);
			font-size: 13px;
			color: var(--search-item);
			transition: all 0.18s linear;
			cursor: pointer;

			&:disabled {
				background-color: var(--search-item-btn-disabled);
				color: var(--search-item-code);
			}
		}
	}
`;

const Empty = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: var(--search-empty);
	font-size: 13px;
`;

const Search = (props) => {
	const { user, data, follow } = props;

	const followHandler = (idx) => {
		if (!user) {
			return setLoginActive(true);
		}

		const {active} = data[idx]
		follow(idx, !active)
		console.log('点击关注或取关', idx, active)
	};

	const renderContentJSX = () => {
		if (data.length) {
			return data.map(({ code, name, value, active }, i) => (
				<Item key={code}>
					<div className="first">
						<span className="top">{name}</span>
						<span className="bottom">{code}</span>
					</div>
					<div className="second">
						<span className="top">{value}</span>
						<span className="bottom">单位净值</span>
					</div>
					<div className="thrid">
						<button disabled={active} onClick={() => followHandler(i)}>
							{active ? "已关注" : "关注"}
						</button>
					</div>
				</Item>
			));
		} else {
			return <Empty>暂无搜索结果</Empty>;
		}
	};

	return <Wrapper>{renderContentJSX()}</Wrapper>;
};

export default Search;
