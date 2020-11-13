import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { ResponsiveContainer, Treemap, Tooltip } from "recharts";
import DemoTreemapItem from "./treemapItem";
import { getUserLocalSetting } from "../../services";
import { STOCKSEARCH } from '../../../../background/api'

const Wrapper = styled.div`
	width: 100%;
	border-radius: 6px;
	background-color: var(--detail-stock-bg);
	padding: 16px;
	margin-bottom: 16px;
`;

const Title = styled.div`
	width: 100%;
	height: 22px;
	font-size: 14px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: var(--detail-stock-title);
	margin-bottom: 10px;

	p {
		display: flex;
		align-items: center;
		gap: 10px;

		i {
			font-size: 14px;
			cursor: pointer;
		}
	}

	.active {
		color: var(--detail-stock-active);
	}
`;

const Content = styled.div`
	width: 100%;
	height: 265px;
`;

const CustomTip = styled.div`
	.name {
		font-size: 13px;
		font-weight: bold;
	}
`;

const Table = styled.div`
	.thead,
	.tr {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		height: 24px;
		justify-items: center;
		align-items: center;
		font-size: 12px;

		& > span:first-of-type {
			justify-self: flex-start;
		}
		& > span:last-of-type {
			justify-self: flex-end;
		}
	}

	.thead {
		color: var(--detail-stock-thead);
	}

	.tr {
		color: var(--detail-stock-tbody);

		.title {
			cursor: pointer;

			&:hover {
				text-decoration: underline;
			}
		}
	}
`;

const Stock = (props) => {
	const { data: stocks, state } = props;
	const total = stocks.reduce((sum, curr) => sum + Number(curr[1].replace("%", "")), 0);
	const colorMap = {
		default: {
			increase: "#FD3E36",
			increaseBg: "#ffb9b9",
			decrease: "#24a746",
			decreaseBg: "#bedebe",
		},
		reverse: {
			decrease: "#FD3E36",
			decreaseBg: "#ffb9b9",
			increase: "#24a746",
			increaseBg: "#bedebe",
		},
	};
	const [theme, setTheme] = useState(colorMap.default);
	const [tabSwitch, setTabSwitch] = useState(false);

	const treeData = stocks.map((item) => ({
		name: item[0],
		size: (Number(item[1].replace("%", "")) / total).toFixed(2) * 100,
		percent: item[2],
		price: item[3],
		pro: item[1],
		code: item[4],
		bg: item[2].includes("-") ? theme.decreaseBg : theme.increaseBg,
		fontColor: item[2].includes("-") ? theme.decrease : theme.increase,
	}));

	const openStockHandler = (code) => {
		console.log('股票代码', code)
		const url = STOCKSEARCH(code)
		window.open(url)
	}

	const renderContentJSX = () => {
		if (!tabSwitch) {
			return (
				<ResponsiveContainer>
					<Treemap
						width={306}
						height={265}
						stroke="#1f2022"
						dataKey="size"
						data={treeData}
						ratio={3 / 4}
						isAnimationActive={false}
						content={<DemoTreemapItem />}
					>
						<Tooltip
							wrapperStyle={{
								border: "1px solid #999",
								background: "#fff",
								padding: "4px",
								borderRadius: "4px",
								fontSize: "12px",
								color: "#333",
							}}
							content={renderTipJSX}
						></Tooltip>
					</Treemap>
				</ResponsiveContainer>
			);
		} else {
			return (
				<Table>
					<div className="thead">
						<span>股票名称</span>
						<span>最新价</span>
						<span>涨跌幅</span>
						<span>持仓占比</span>
					</div>
					<div className="tbody">
						{treeData.map((item, idx) => (
							<div className="tr" key={idx}>
								<span className="title" onClick={() => openStockHandler(item.code)}>{item.name}</span>
								<span style={{ color: item.fontColor }}>{item.price}</span>
								<span style={{ color: item.fontColor }}>{item.percent}</span>
								<span>{item.pro}</span>
							</div>
						))}
					</div>
				</Table>
			);
		}
	};

	const renderTipJSX = ({ active, payload }) => {
		if (active) {
			const {
				payload: { name, price, percent, fontColor, pro },
			} = payload[0];
			return (
				<CustomTip>
					<p className="name">{name}</p>
					<p className="percent">
						涨跌幅：<span style={{ color: fontColor }}>{percent}</span>
					</p>
					<p className="price">
						最新价：<span style={{ color: fontColor }}>{price}</span>
					</p>
					<p>持仓占比：{pro}</p>
				</CustomTip>
			);
		}
		return null;
	};

	useEffect(() => {
		getUserLocalSetting().then(({ reverseColor }) =>
			setTheme(reverseColor ? colorMap.reverse : colorMap.default)
		);
	}, [state]);

	return (
		<Wrapper>
			<Title>
				<span>重仓股票</span>
				<p>
					<i
						className={`iconfont chicken-kuaizhuang ${!tabSwitch && "active"}`}
						onClick={() => setTabSwitch(false)}
					></i>
					<i
						className={`iconfont chicken-ziyuan ${tabSwitch && "active"}`}
						onClick={() => setTabSwitch(true)}
					></i>
				</p>
			</Title>
			<Content>{renderContentJSX()}</Content>
		</Wrapper>
	);
};

export default Stock;
