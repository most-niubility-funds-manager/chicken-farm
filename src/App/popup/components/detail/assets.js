/*
 * @Date: 2020-10-22 21:49:21
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-20 13:03:51
 * @Description: 资产详情
 */
import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	padding: 16px;
	border-radius: 6px;
	background-color: var(--detail-main-bg);
	margin-bottom: 16px;

	h2 {
		text-align: left;
		font-size: 14px;
		color: var(--detail-main-h2);
		margin-bottom: 12px;
		line-height: 1;
	}

	.bottom {
		width: 100%;
		height: 45px;
		display: grid;
		grid-template-columns: repeat(3, 1fr);

		.item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-end;

			.value {
				font-size: 13px;
				font-weight: 500;
				color: var(--detail-main-normal);

				&.increase {
					color: var(--detail-main-increase);
				}
				&.decrease {
					color: var(--detail-main-decrease);
				}
			}
			.text {
				font-size: 12px;
				color: var(--detail-main-text);
				white-space: nowrap;
			}
		}
	}
`;

const Assets = (props) => {
	const {
		data: { cost, unit },
		realData: { realUnit },
		storeData: { historyWorth },
	} = props;
	const total = (cost * unit).toFixed(2);

	const dayBeforeUnit = historyWorth ? historyWorth[1][1] : 0;
	const lastIncome = (cost * (realUnit - dayBeforeUnit)).toFixed(2);
	const lastIncomClass = lastIncome && lastIncome.includes("-") ? "decrease" : "increase";
	const holdCost = (realUnit * cost - total).toFixed(2);
	const holdCostClass = holdCost && holdCost.includes("-") ? "decrease" : "increase";

	return (
		<Wrapper>
			<h2>资产详情</h2>
			<div className="bottom">
				<div className="item" style={{ "align-items": "flex-start" }}>
					<span className="text">金额</span>
					<span className="value">{total}</span>
				</div>
				<div className="item" style={{ "align-items": "center" }}>
					<span className="text">昨日收益</span>
					<span className={`value ${lastIncomClass}`}>
						{lastIncome && (lastIncome.includes("-") ? lastIncome : `+${lastIncome}`)}
					</span>
				</div>
				<div className="item">
					<span className="text">累计收益</span>
					<span className={`value ${holdCostClass}`}>
						{holdCost && (holdCost.includes("-") ? holdCost : `+${holdCost}`)}
					</span>
				</div>
			</div>
		</Wrapper>
	);
};

export default Assets;
