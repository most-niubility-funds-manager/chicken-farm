/*
 * @Date: 2020-10-31 18:07:53
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-03 23:14:23
 * @Description: 净值涨幅列表
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
`;

const Tab = styled.div`
	display: flex;
	align-items: center;
	gap: 1em;
	margin-bottom: 10px;

	.item {
		font-size: 14px;
		color: var(--detail-worth-tab);
		transition: all 0.12s linear;
		border-bottom-style: solid;
		border-bottom-width: 2px;
		border-bottom-color: transparent;
		cursor: pointer;

		&.active {
			color: var(--detail-worth-tab-active);
			border-bottom-color: var(--detail-worth-tab-active);
		}
	}
`;

const Table = styled.div`
	&.worth {
		.thead,
		.tr {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.thead {
		font-size: 12px;
		color: var(--detail-worth-thead);
		display: grid;
		grid-template-columns: 80px 1fr 1fr;
		height: 24px;
		justify-items: flex-end;
		align-items: center;

		& > span:first-of-type {
			justify-self: flex-start;
		}
	}
	.tr {
		height: 24px;
		font-size: 12px;
		color: var(--detail-worth-tbody);
		display: grid;
		grid-template-columns: 80px 1fr 1fr;
		justify-items: flex-end;
		align-items: center;

		& > span:first-of-type {
			justify-self: flex-start;
		}

		.rank {
			i {
				font-style: normal;
				margin: 0 4px;
			}

			span:last-of-type {
				color: var(--detail-worth-rank);
			}
		}
	}
`;

const Worth = (props) => {
	const { data = {} } = props;
	const { historyWorth = null, historyPerformance = null } = data || {};
	const [tabActive, setTabActive] = useState(false);

	const tabSwitchHandler = (state) => state !== tabActive && setTabActive(state);

	const renderTableJSX = () => {
		if (tabActive) {
			return (
				<Table className="worth">
					<div className="thead">
						<span>日期</span>
						<span>单位净值</span>
						<span>累计净值</span>
						<span>日涨幅</span>
					</div>
					{historyWorth &&
						historyWorth.slice(0, 7).map((item, idx) => (
							<div className="tr" key={idx}>
								{item.map((td, i) => (
									<span key={i}>{td}</span>
								))}
							</div>
						))}
				</Table>
			);
		} else {
			return (
				<Table>
					<div className="thead">
						<span>时间区间</span>
						<span>涨跌幅</span>
						<span>同类业绩排名</span>
					</div>
					{historyPerformance &&
						historyPerformance.time.slice(0, 7).map((time, idx) => (
							<div className="tr" key={idx}>
								<span>{time}</span>
								<span>{historyPerformance["crease"][idx]}</span>
								<span className="rank">
									<span>{historyPerformance["rank"][idx][0]}</span>
									<i>/</i>
									<span>{historyPerformance["rank"][idx][1]}</span>
								</span>
							</div>
						))}
				</Table>
			);
		}
	};

	return (
		<Wrapper>
			<Tab>
				<div className={`item ${!tabActive && "active"}`} onClick={() => tabSwitchHandler(false)}>
					历史业绩
				</div>
				<div className={`item ${tabActive && "active"}`} onClick={() => tabSwitchHandler(true)}>
					历史净值
				</div>
			</Tab>
			{renderTableJSX()}
		</Wrapper>
	);
};

export default Worth;
