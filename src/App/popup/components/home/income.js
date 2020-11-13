/*
 * @Date: 2020-10-17 15:21:14
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-23 16:55:51
 * @Description: 顶部收益面板
 */
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { thousandUnit } from "@utils";
import Saga from "@lib/saga";
import { getTotalData } from "../../services";

const fadeIn = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const Wrapper = styled.div.attrs({ className: "income" })`
	width: 100%;
	height: 60px;
	padding: 8px;
	border-radius: 6px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0 34px;
	background-color: var(--income-bg);
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
	color: var(--income-color);

	.desc {
		font-weight: 500;
		color: var(--income-main);
		&.increase {
			color: var(--income-increase);
		}
		&.decrease {
			color: var(--income-decrease);
		}
	}
`;

const IncomePanel = () => {
	const [total, setTotal] = useState({});
	const totalDataSaga = new Saga(getTotalData); 

	useEffect(() => {
		totalDataSaga.start((data) => {
			setTotal(data);
		}, 5000);
		return () => {
			totalDataSaga.stop();
		};
	}, []);

	// crease class
	const { lastIncome, totalIncome, fakeIncome, totalCost } = total;
	const lastCrease = `desc ${lastIncome < 0 ? "decrease" : "increase"}`;
	const totalCrease = `desc ${totalIncome < 0 ? "decrease" : "increase"}`;
	const fakeCrease = `desc ${fakeIncome < 0 ? "decrease" : "increase"}`;

	return (
		<Wrapper>
			<Item>
				<p className="title">总资产</p>
				<p className="desc">{thousandUnit(totalCost)}</p>
			</Item>
			<Item>
				<p className="title">昨日收益</p>
				<p className={lastCrease}>{lastIncome < 0 ? lastIncome : `+${lastIncome}`}</p>
			</Item>
			<Item>
				<p className="title">累计收益</p>
				<p className={totalCrease}>{totalIncome < 0 ? totalIncome : `+${totalIncome}`}</p>
			</Item>
			<Item>
				<p className="title">今日预估</p>
				<p className={fakeCrease}>{fakeIncome < 0 ? fakeIncome : `+${fakeIncome}`}</p>
			</Item>
		</Wrapper>
	);
};

export default IncomePanel;
