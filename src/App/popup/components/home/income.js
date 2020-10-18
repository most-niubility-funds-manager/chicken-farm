/*
 * @Date: 2020-10-17 15:21:14
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-18 17:51:34
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

const Wrapper = styled.div`
	width: 100%;
	height: 60px;
	padding: 8px;
	border-radius: 6px;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	gap: 0 7px;
	align-items: center;
	color: var(--income-color);
	background-color: var(--income-bg);
	margin-bottom: 8px;
	opacity: 0;
	animation: ${fadeIn} 0.18s linear 0.1s forwards;
`;

const AllText = styled.div`
	font-size: 13px;
	display: flex;
	align-items: center;
	gap: 4px;
	cursor: pointer;

	i {
		font-size: 14px;
		color: var(--income-icon);
	}
`;

const Detail = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 13px;

	.crease {
		font-weight: 500;
		&.increase {
			color: var(--income-increase);
		}
		&.decrease {
			color: var(--income-decrease);
		}
	}
`;

const AllMoney = styled.div`
	font-weight: 500;
	font-size: 18px;
	color: var(--income-main);
`;

const IncomePanel = () => {
	const [total, setTotal] = useState({});
	const totalDataSaga = new Saga(getTotalData);

	useEffect(() => {
		totalDataSaga.start((data) => {
			setTotal(data);
		}, 1000);
		return () => {
			totalDataSaga.stop();
		};
	}, []);

	return (
		<Wrapper>
			<AllText>
				总资产<i className="iconfont chicken-browse"></i>
			</AllText>
			<Detail>
				昨日收益
				<span className="crease">{total.lastIncome}</span>
			</Detail>
			<AllMoney>{total.totalCost}</AllMoney>
			<Detail>
				累计收益
				<span className="crease">{total.totalIncome}</span>
			</Detail>
		</Wrapper>
	);
};

export default IncomePanel;
