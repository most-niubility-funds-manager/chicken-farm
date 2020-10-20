/*
 * @Date: 2020-10-05 09:43:37
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-20 10:09:33
 * @Description: 大盘
 */
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import Saga from "@lib/saga";
import { getFundBaseData, getMarketStatus } from "../../services";

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`

const Wrapper = styled.div.attrs({ className: "market" })`
	width: 100%;
	height: 60px;
	padding: 8px;
	border-radius: 6px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0 34px;
	background-color: var(--market-bg);
	margin-bottom: 8px;
	opacity: 0;
	animation: ${fadeIn} 0.18s linear 0.1s forwards;
`;

const Item = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 13px;
	color: var(--market-title);

	.desc {
		font-weight: 500;
	}

	&.crease {
		.desc {
			color: var(--market-crease);
		}
	}
	&.decrease {
		.desc {
			color: var(--market-decrease);
		}
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

			return () => {
				baseDataSaga.stop()
			}
	}, [isStart]);

	useEffect(() => {
		statusSaga.start(({ status }) => {
			setStart(status);
			!status && baseDataSaga.stop(); //	是否终止请求
		}, 1000);

		return () => {
			statusSaga.stop()
		}
	}, []);

	const renderMarketJSX = () =>
		baseData.map(({ className, current, name, percent }) => (
			<Item className={className} key={name}>
				<p className="title">{name}</p>
				<p className="desc">{percent}</p>
			</Item>
		));

	return <Wrapper>{renderMarketJSX()}</Wrapper>;
};

export default Market;
