/*
 * @Date: 2020-10-05 09:43:37
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-11 14:55:02
 * @Description: 大盘
 */
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Saga from "@lib/saga";
import { getFundBaseData, getMarketStatus } from "../../services";

const Wrapepr = styled.div.attrs({ className: "market" })`
	width: 100%;
	height: 60px;
	padding: 5px 5px;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	gap: 5px;
	border-bottom: 1px solid var(--market-border);
`;

const Item = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 6px;
	background-color: var(--market-bg);
	cursor: pointer;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 5px;
	font-size: 14px;

	&.crease {
		background-image: linear-gradient(0deg, var(--market-bg-crease), transparent);
		animation: ${() => pulse("--market-pulse-crease")} 0.4s linear forwards;

		.desc {
			color: var(--market-crease);
		}
	}
	&.decrease {
		background-image: linear-gradient(0deg, var(--market-bg-decrease), transparent);
		animation: ${() => pulse("--market-pulse-decrease")} 0.4s linear forwards;

		.desc {
			color: var(--market-decrease);
		}
	}

	.title {
		color: var(--market-title);
	}
	.desc {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
`;

const pulse = (color) => keyframes`
	from{
		border: 1px solid var(${color});
	}
	to {
		border: 1px solid transparent;
	}
`;

const Market = () => {
	const [baseData, setBaseData] = useState([]);
	const [isStart, setStart] = useState(true);
	const baseDataSaga = new Saga(getFundBaseData);
	const statusSaga = new Saga(getMarketStatus); //	当日交易时间

	useEffect(() => {
		isStart &&
			baseDataSaga.start((data) => {
				const result = data.map((d) => ({
					...d,
					className: d.percent.includes("-") ? "decrease" : "crease",
				}));
				setBaseData(result);
			}, 5000);
	}, [isStart]);

	useEffect(() => {
		statusSaga.start(({ status }) => {
			setStart(status);
			!status && baseDataSaga.stop(); //	是否终止请求
		}, 1000);
	}, []);

	const renderMarketJSX = () =>
		baseData.map(({ className, current, name, percent }) => (
			<Item className={className} key={name}>
				<p className="title">{name}</p>
				<p className="desc">
					<span>{current}</span>
					<span>{percent}</span>
				</p>
			</Item>
		));

	return <Wrapepr>{renderMarketJSX()}</Wrapepr>;
};

export default Market;
