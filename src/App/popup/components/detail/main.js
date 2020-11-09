/*
 * @Date: 2020-10-22 21:28:20
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-04 12:05:14
 * @Description: 头部面板
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

	.top {
		text-align: left;
		line-height: 1;
		margin-bottom: 16px;

		h2 {
			font-size: 16px;
			color: var(--detail-main-h2);
			margin-bottom: 8px;
		}

		p {
			font-size: 12px;
			color: var(--detail-main-p);
		}
	}

	.bottom {
		width: 100%;
		height: 45px;
		display: grid;
		grid-template-columns: 1fr 70px 1fr;

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

const MainInfo = (props) => {
	const {
		realData,
		storeData: { historyPerformance },
	} = props;

	const realPercent =
		realData.realPercent &&
		(realData.realPercent.includes("-") ? `${realData.realPercent}%` : `+${realData.realPercent}%`);
	const realPercentClass = realPercent && realPercent.includes("-") ? "decrease" : "increase";
	const threeMonth =
		historyPerformance &&
		(historyPerformance.crease[2].includes("-")
			? `${historyPerformance.crease[2]}`
			: `+${historyPerformance.crease[2]}`);
	const threeMonthClass =
		threeMonth && threeMonth.includes("-") ? `decrease` : `increase`;

	console.log('realData', realData)
	return (
		<Wrapper>
			<div className="top">
				<h2>{ realData && realData.name }</h2>
				<p>{ realData && realData.code }</p>
			</div>
			<div className="bottom">
				<div className="item" style={{ "align-items": "flex-start" }}>
					<span className="value">{realData.realUnit}</span>
					<span className="text">净值</span>
				</div>
				<div className="item">
					<span className={`value ${realPercentClass}`}>{realPercent}</span>
					<span className="text">昨日涨幅</span>
				</div>
				<div className="item">
					<span className={`value ${threeMonthClass}`}>{threeMonth}</span>
					<span className="text">近3个月涨幅</span>
				</div>
			</div>
		</Wrapper>
	);
};

export default MainInfo;
