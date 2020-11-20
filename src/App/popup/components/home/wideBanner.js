/*
 * @Date: 2020-11-16 14:49:33
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-19 18:07:16
 * @Description: 宽屏模式顶部模块
 */
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { getFundBaseData, getMarketStatus, getTotalData } from "../../services";
import { thousandUnit } from "@utils";
import Saga from "@lib/saga";

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div.attrs({ className: "wide-banner" })`
	width: 100%;
	height: 60px;
	padding: 8px;
	border-radius: 6px;
	opacity: 0;
	background-color: var(--market-bg);
	animation: ${fadeIn} 0.18s linear 0.1s forwards;
	display: grid;
	grid-template-columns: 1fr 20px;
	margin-bottom: 8px;

	&.none {
		grid-template-columns: 1fr;
	}
`;

const Content = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	gap: 15px;
`;

const BtnBox = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-end;
`;

const Btn = styled.div`
	width: 12px;
	height: 28px;
	border-radius: 8px;
	position: relative;
	cursor: pointer;
	background-color: var(--setting-switch);
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		transform: translateY(calc(-100% - 2px));
		width: 100%;
		height: 100%;
		background-color: var(--setting-switch-active);
		transition: all 0.15s ease;
	}

	span {
		width: 8px;
		height: 8px;
		border-radius: 50%;
		background-color: var(--setting-switch-span);
		position: absolute;
		top: 2px;
		left: 2px;
		transition: all 0.15s linear;
	}

	&.active {
		&::before {
			transform: translateY(0);
		}

		span {
			top: calc(100% - 10px);
		}
	}
`;

const MarketItem = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 6px;
	font-size: 13px;
	color: var(--market-title);
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	opacity: 0;
	animation: ${fadeIn} 0.18s linear 0.1s forwards;

	&.increase {
		p:last-of-type {
			color: var(--market-crease);
		}
	}
	&.decrease {
		p:last-of-type {
			color: var(--market-decrease);
		}
	}

	& > p {
		&:last-of-type {
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 13px;
			font-weight: bold;
		}

		span:last-of-type {
			font-size: 12px;
		}
	}
`;

const IncomeItem = styled.div`
	width: 100%;
	height: 100%;
	border-radius: 6px;
	display: flex;
	justify-content: space-between;
	flex-direction: column;
	font-size: 13px;
	color: var(--income-color);
	opacity: 0;
	animation: ${fadeIn} 0.18s linear 0.1s forwards;

	p {
		color: var(--market-title);
		&.increase {
			color: var(--market-crease);
		}
		&.decrease {
			color: var(--market-decrease);
		}

		&:last-of-type {
			font-weight: bold;
		}
	}
`;

const WideBanner = ({ setting }) => {
	const [btnState, setBtnState] = useState(false);
	const [baseData, setBaseData] = useState([]);
	const [totalData, setTotalData] = useState({});
	const statusSaga = new Saga(getMarketStatus);
	const { marketState, incomeState } = setting;

	const changeBtnStateHandler = () => setBtnState(!btnState);

	const renderItemsJSX = () => {
		if (btnState || (!marketState && incomeState)) {
			const { lastIncome, totalIncome, fakeIncome, totalCost } = totalData;
			const lastCrease = `${lastIncome < 0 ? "decrease" : "increase"}`;
			const totalCrease = `${totalIncome < 0 ? "decrease" : "increase"}`;
			const fakeCrease = `${fakeIncome < 0 ? "decrease" : "increase"}`;

			const arr = [
				["总资产", thousandUnit(totalCost)],
				["昨日收益", lastIncome < 0 ? lastIncome : `+${lastIncome}`, lastCrease],
				["累计收益", totalIncome < 0 ? totalIncome : `+${totalIncome}`, totalCrease],
				["今日预估", fakeIncome < 0 ? fakeIncome : `+${fakeIncome}`, fakeCrease],
			];

			return arr.map(([title, d, className]) => (
				<IncomeItem>
					<p>{title}</p>
					<p className={className}>{d}</p>
				</IncomeItem>
			));
		} else if (!btnState || (marketState && !incomeState)) {
			return (
				baseData &&
				baseData.length &&
				baseData.map(({ percent, name, current }) => (
					<MarketItem className={percent.includes("-") ? "decrease" : "increase"}>
						<p>{name}</p>
						<p>
							<span>{current}</span>
							<span>{percent}</span>
						</p>
					</MarketItem>
				))
			);
		}
	};

	const renderBtnJSX = () => {
		if (marketState && incomeState) {
			return (
				<BtnBox>
					<Btn className={btnState && "active"} onClick={changeBtnStateHandler}>
						<span></span>
					</Btn>
				</BtnBox>
			);
		}
		return null;
	};

	useEffect(() => {
		statusSaga.start((status) => {
			Promise.all([getFundBaseData(), getTotalData()]).then((res) => {
				setBaseData(res[0]);
				setTotalData(res[1]);
			});
		}, 5000);

		return () => {
			statusSaga.stop();
		};
	}, []);

	return (
		<Wrapper className={(!marketState || !incomeState) && "none"}>
			<Content>{renderItemsJSX()}</Content>
			{renderBtnJSX()}
		</Wrapper>
	);
};

export default WideBanner;
