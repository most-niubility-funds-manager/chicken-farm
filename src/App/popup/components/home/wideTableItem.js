import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setTotalData, setDetailState, getFundDetailData } from "../../services";
import Saga from "@lib/saga";

const Wrapper = styled.div`
	width: 100%;
	padding: 6px 0;
	display: grid;
	grid-template-columns: 180px repeat(4, 1fr);
	background-color: var(--table-tr-bg);
	cursor: pointer;
	transition: all 0.18s;

	&:hover {
		background-color: var(--table-tr-bg-active);
	}
`;

const NameBox = styled.div`
	padding: 0 6px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 4px;

	p {
		font-size: 12px;
		color: var(--table-tr);
		white-space: pre-wrap;
		line-height: 1.3;
	}

	.code {
		display: flex;
		align-items: center;
		font-size: 12px;
		color: var(--table-tr-code);
		gap: 4px;
	}

	.badge {
		padding: 2px;
		font-size: 12px;
		color: var(--table-badge);
		background-color: var(--table-badge-bg);
		border-radius: 2px;
		transform: scale(0.8);
		transform-origin: left;
	}
`;

const ValueBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	gap: 4px;

	span {
		font-size: 12px;
		font-weight: bold;
		color: var(--table-tr);
	}

	p {
		font-size: 12px;

		&.increase {
			color: var(--table-tr-increase);
		}
		&.decrease {
			color: var(--table-tr-decrease);
		}
	}
`;

const MoneyBox = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;

	span {
		font-size: 13px;
		font-weight: bold;
		color: var(--table-tr);

		&.increase {
			color: var(--table-tr-increase);
		}
		&.decrease {
			color: var(--table-tr-decrease);
		}
	}
`;

const WideItem = ({ data, user }) => {
	const {
		name,
		code,
		init_cost,
		init_unit,
		fakePercent,
		fakeUnit,
		fakeIncome,
		totalIncome,
		hold,
		className,
		follow,
		realUnit,
	} = data;
	const [baseDetail, setBaseDetail] = useState(null);
	const [totalParams, setTotalParams] = useState({});

	const openDetailHandler = () => {
		setDetailState({
			state: true,
			code: code,
			followState: follow,
			cost: init_cost,
			unit: init_unit,
		});
	};

	const lastIncome = () => {
		const dayBeforeUnit = baseDetail ? baseDetail[1][1] : 0;
		const number = init_cost * (realUnit - dayBeforeUnit);
		if (!Number.isNaN(number)) {
			return number > 0 ? `+${number.toFixed(2)}` : number.toFixed(2);
		}
		return "0";
	};

	const params = () => {
		if (init_cost && init_unit) {
			return {
				code: code,
				totalCost: (init_cost * realUnit).toFixed(2),
				lastIncome: lastIncome(),
				fakeIncome: fakeIncome.includes("--") ? "0" : fakeIncome,
				totalIncome,
			};
		}
		return null;
	};

	useEffect(() => {
		const totalDataSaga = new Saga(() => setTotalData(totalParams));
		if (totalParams && Object.keys(totalParams).length) {
			totalDataSaga.start((_) => _, 2000);
		}

		return () => {
			totalDataSaga.stop();
		};
	}, [user, totalParams]);

	useEffect(() => {
		setTotalParams(params());
	}, [baseDetail]);

	useEffect(() => {
		const detailDataSaga = new Saga(() => getFundDetailData(code));
		detailDataSaga.start((_) => {
			const { historyWorth = null } = _ || {};
			setBaseDetail(historyWorth);
		}, 2000);

		return () => {
			detailDataSaga.stop();
		};
	}, []);

	return (
		<Wrapper onClick={openDetailHandler}>
			<NameBox>
				<p>{name}</p>
				<span className="code">
					{code}
					{init_cost && init_unit && <span className="badge">持有</span>}
				</span>
			</NameBox>
			<ValueBox>
				<span>{fakeUnit}</span>
				<p className={className}>{fakePercent}%</p>
			</ValueBox>
			<MoneyBox>
				<span className={className}>{fakeIncome}</span>
			</MoneyBox>
			<MoneyBox>
				<span className={totalIncome.includes("-") ? "decrease" : "increase"}>{totalIncome}</span>
			</MoneyBox>
			<MoneyBox>
				<span>{hold}</span>
			</MoneyBox>
		</Wrapper>
	);
};

export default WideItem;
