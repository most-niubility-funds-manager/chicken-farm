import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
	ResponsiveContainer,
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Legend,
	Tooltip,
} from "recharts";
import { getFundValuation } from "../../services";

const Wrapper = styled.div`
	width: 100%;
	border-radius: 6px;
	background-color: var(--detail-stock-bg);
	padding: 16px;
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

const Content = styled.div`
	width: 100%;
	height: 220px;
`;

const Trend = ({ data, state, code }) => {
	const [tabActive, setTabActive] = useState(false);
	const [period, setPeriod] = useState(180);
	const [trendData, setTrendData] = useState([]);

	const convertXAxisTick = (item) => {
		if (period < 180) {
			return item.split("-").slice(1).join("-");
		}
		return item;
	};

	const formatTime = (stamp) => {
		const date = new Date(stamp);
		const hour = date.getHours().toString().padStart(2, "0");
		const minute = date.getMinutes().toString().padStart(2, "0");

		return `${hour}:${minute}`;
	};

	const switchTab = async (state) => {
		setTabActive(state);

		if (!state) {
			const lineData = data[period].map(({ date, gr_nav, gr_per, hs300_nav }) => ({
				date,
				self: gr_nav,
				base: hs300_nav,
				per: gr_per,
			}));
			setTrendData(lineData);
		} else {
			const originData = await getFundValuation(code);
			const lineData = originData.map(({ time, nav, percentage }) => ({
				time: formatTime(time),
				nav,
				percentage: `${percentage * 100}%`,
			}));
			setTrendData(lineData);
		}
	};

	const renderChartJSX = () => {
		if (tabActive) {
			return (
				<ResponsiveContainer>
					<LineChart
						width={306}
						height={220}
						data={trendData}
						margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
					>
						<XAxis dataKey="time" height={20} tick={{ fontSize: 8 }}></XAxis>
						<YAxis type="number" dataKey="percentage" width={20} tick={{ fontSize: 8 }}></YAxis>
						<Line dataKey="nav" stroke="#3278f6"></Line>
					</LineChart>
				</ResponsiveContainer>
			);
		} else {
			return (
				<ResponsiveContainer>
					<LineChart
						width={306}
						height={220}
						data={trendData}
						margin={{ top: 0, bottom: 0, left: 0, right: 0 }}
					>
						<XAxis
							dataKey="date"
							height={20}
							tick={{ fontSize: 8 }}
							tickFormatter={convertXAxisTick}
						></XAxis>
						<YAxis
							type="number"
							dataKey="percentage"
							unit="%"
							width={20}
							tick={{ fontSize: 8 }}
						></YAxis>
						<Line dataKey="self" stroke="#3278f6"></Line>
						<Line dataKey="base" stroke="#f0a45d"></Line>
						<Tooltip />
					</LineChart>
				</ResponsiveContainer>
			);
		}
	};

	useEffect(() => {
		switchTab(false);
	}, [state]);

	return (
		<Wrapper>
			<Tab>
				<span className={`item ${!tabActive && "active"}`} onClick={() => switchTab(false)}>
					业绩走势
				</span>
				<span className={`item ${tabActive && "active"}`} onClick={() => switchTab(true)}>
					净值估算
				</span>
			</Tab>
			<Content>{renderChartJSX()}</Content>
		</Wrapper>
	);
};

export default Trend;
