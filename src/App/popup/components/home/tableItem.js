import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setTotalData, setDetailState } from "../../services";

const FocusWrapper = styled.div.attrs({ className: "table-list-item" })`
	width: 100%;
	height: 64px;
	padding: 8px;
	border-radius: 6px;
	display: grid;
	grid-template-columns: 180px 1fr 92px;
	align-items: center;
	color: var(--table-tr);
	background-color: var(--table-tr-bg);
	font-size: 13px;
	margin-bottom: 8px;
	cursor: pointer;

	.first {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 4px;
		width: 100%;

		.title {
			width: 100%;
			font-weight: bold;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
		.code {
			font-size: 12px;
			color: var(--table-tr-code);
		}
	}
	.second {
		text-align: right;
	}
	.thrid {
		text-align: right;
		&.increase {
			color: var(--table-tr-increase);
		}
		&.decrease {
			color: var(--table-tr-decrease);
		}
	}
`;

const HoldWrapper = styled.div.attrs({ className: "table-list-item" })`
	width: 100%;
	height: auto;
	padding: 8px;
	border-radius: 6px;
	font-size: 12px;
	color: var(--table-tr-code);
	background-color: var(--table-tr-bg);
	margin-bottom: 8px;
	cursor: pointer;

	.title {
		font-size: 13px;
		font-weight: 500;
		color: var(--table-tr);
		text-align: left;
		margin-bottom: 8px;
	}

	.detail-grid {
		width: 100%;
		height: 40px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);

		.item {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			align-items: flex-end;

			span {
				color: var(--table-tr);

				&.increase {
					color: var(--table-tr-increase);
				}
				&.decrease {
					color: var(--table-tr-decrease);
				}
			}

			&:first-child {
				align-items: flex-start;
			}
		}
	}
`;

const Item = (props) => {
	const { type, data, base = {}, refreshTotal } = props;

	// 涨跌clss
	const creaseType = data.fakePercent.includes("-") ? "decrease" : "increase";
	// 实时百分比
	const fakePercent = data.fakePercent.includes("-")
		? `${data.fakePercent}%`
		: `+${data.fakePercent}%`;
	// 成本
	const cost = (base.init_cost * base.init_unit).toFixed(2);
	const currentCost = (base.init_cost * data.realUnit).toFixed(2);
	// 累计收益
	const totalIncome = () => {
		const value = (base.init_cost * data.realUnit).toFixed(2);
		const diff = (value - cost).toFixed(2);
		return diff.includes("-") ? `${diff}` : `+${diff}`;
	};
	// 昨日收益
	const lastIncome = () => {
		const number = (base.init_cost * data.realUnit * data.realPercent) / 100;
		return number > 0 ? `+${number.toFixed(2)}` : number.toFixed(2);
	};
	// 实时估算
	const fakeIncome = () => {
		if (data.fakePercent !== "--") {
			const number = (cost * data.fakePercent) / 100;
			return number > 0 ? `+${number.toFixed(2)}` : number.toFixed(2);
		} else {
			return "--";
		}
	};

	const openDetailHandler = () => {
		setDetailState({
			state: true,
			code: data.code,
			followState: base.follow,
			cost: base.init_cost,
			unit: base.init_unit,
		});
	};

	useEffect(() => {
		if (type && base.init_cost) {
			// 提交并计算总资产
			const params = {
				code: data.code,
				totalCost: currentCost,
				lastIncome: lastIncome(),
				fakeIncome: fakeIncome() === "--" ? 0 : fakeIncome(),
				totalIncome: totalIncome(),
			};
			setTotalData(params);
		}
	}, [type, refreshTotal]);

	if (!type) {
		return (
			<FocusWrapper onClick={openDetailHandler}>
				<span className="first">
					<p className="title">{data.name}</p>
					<p className="code">{data.code}</p>
				</span>
				<span className="second">{data.fakeUnit}</span>
				<span className={`thrid ${creaseType}`}>{fakePercent}</span>
			</FocusWrapper>
		);
	} else {
		return (
			<HoldWrapper onClick={openDetailHandler}>
				<p className="title">{data.name}</p>
				<div className="detail-grid">
					<div className="item">
						<p>金额</p>
						<span>{currentCost}</span>
					</div>
					<div className="item">
						<p>累计收益</p>
						<span className={totalIncome().includes("-") ? "decrease" : "increase"}>
							{totalIncome()}
						</span>
					</div>
					<div className="item">
						<p>昨日收益</p>
						<span className={lastIncome().includes("-") ? "decrease" : "increase"}>
							{lastIncome()}
						</span>
					</div>
					<div className="item">
						<p>今日预估</p>
						<span className={fakeIncome().includes("-") ? "decrease" : "increase"}>
							{fakeIncome()}
						</span>
					</div>
				</div>
			</HoldWrapper>
		);
	}
};

export default Item;
