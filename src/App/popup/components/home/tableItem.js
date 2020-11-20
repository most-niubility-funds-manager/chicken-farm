import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setTotalData, setDetailState, getFundDetailData } from "../../services";
import Saga from "@lib/saga";

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
	const { type = true, data, user } = props;
	const { fakePercent, init_cost, init_unit, realUnit, code, name, follow, fakeUnit } = data;
	const [baseDetail, setBaseDetail] = useState({});

	// 涨跌clss
	const creaseType = fakePercent.includes("-") ? "decrease" : "increase";
	// 实时百分比
	const _fakePercent = fakePercent.includes("-") ? `${fakePercent}%` : `+${fakePercent}%`;
	// 成本
	const cost = (init_cost * init_unit).toFixed(2);
	const currentCost = (init_cost * realUnit).toFixed(2);
	// 累计收益
	const totalIncome = () => {
		const value = (init_cost * realUnit).toFixed(2);
		const diff = (value - cost).toFixed(2);
		return diff.includes("-") ? `${diff}` : `+${diff}`;
	};
	// 昨日收益
	const lastIncome = () => {
		// 基金详情
		const { historyWorth = null } = baseDetail || {};
		const dayBeforeUnit = historyWorth ? historyWorth[1][1] : 0;
		const number = init_cost * (realUnit - dayBeforeUnit);
		if (!Number.isNaN(number)) {
			return number > 0 ? `+${number.toFixed(2)}` : number.toFixed(2);
		}
		return "0";
	};
	// 实时估算
	const fakeIncome = () => {
		if (fakePercent !== "--") {
			const number = (currentCost * fakePercent) / 100;
			return number > 0 ? `+${number.toFixed(2)}` : number.toFixed(2);
		} else {
			return "--";
		}
	};

	// 实时估算的saga
	const params = {
		code: code,
		totalCost: currentCost,
		lastIncome: lastIncome(),
		fakeIncome: fakeIncome() === "--" ? 0 : fakeIncome(),
		totalIncome: totalIncome(),
	};

	const totalDataSaga = new Saga(() => setTotalData(params));

	const openDetailHandler = () => {
		setDetailState({
			state: true,
			code: code,
			followState: follow,
			cost: init_cost,
			unit: init_unit,
		});
	};

	useEffect(() => {
		// 提交并计算总资产
		totalDataSaga.start((_) => _, 5000);

		return () => {
			totalDataSaga.stop();
		};
	}, [user]);

	useEffect(() => {
		const fetchData = async () => {
			const _ = await getFundDetailData(code);
			setBaseDetail(_);
		};
		fetchData();
	}, []);

	if (!type) {
		return (
			<FocusWrapper onClick={openDetailHandler}>
				<span className="first">
					<p className="title">{name}</p>
					<p className="code">{code}</p>
				</span>
				<span className="second">{fakeUnit}</span>
				<span className={`thrid ${creaseType}`}>{_fakePercent}</span>
			</FocusWrapper>
		);
	} else {
		return (
			<HoldWrapper onClick={openDetailHandler}>
				<p className="title">{name}</p>
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
