/*
 * @Date: 2020-11-16 18:10:18
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-18 00:51:50
 * @Description: 宽屏模式列表
 */
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import WideItem from "./wideTableItem";

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	position: relative;
	border: 6px;
`;

const Head = styled.div`
	width: 100%;
	height: 30px;
	border-radius: 6px 0 0 6px;
	background-color: var(--table-tr-bg);
	display: grid;
	grid-template-columns: 180px repeat(4, 1fr);
	margin-bottom: 2px;

	span {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 13px;
		gap: 4px;
		color: var(--table-th-light);
		cursor: pointer;
		user-select: none;

		&:first-of-type {
			justify-content: flex-start;
			padding-left: 6px;
		}

		i {
			width: 5px;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			gap: 3px;

			&::before,
			&::after {
				content: "";
				width: 0;
				height: 0;
				border-width: 4px 3px;
				border-style: solid;
				border-color: transparent transparent var(--table-arrow) transparent;
			}
			&::after {
				border-color: var(--table-arrow) transparent transparent transparent;
			}

			&.up {
				&::before {
					border-color: transparent transparent var(--table-arrow-active) transparent;
				}
			}
			&.down {
				&::after {
					border-color: var(--table-arrow-active) transparent transparent transparent;
				}
			}
		}
	}
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2px;
	overflow: auto;
	max-height: 364px;
`;

const WideTable = ({ user, data }) => {
	const [headData, setHeadData] = useState([
		{ name: "基金名称", sort: false },
		{ name: "估值", sort: true, type: 0, key: "fakePercent" },
		{ name: "预估收益", sort: true, type: 0, key: "fakeIncome" },
		{ name: "累计收益", sort: true, type: 0, key: "totalIncome" },
		{ name: "持有金额", sort: true, type: 0, key: "hold" },
	]);
	const [currSort, setcurrSort] = useState(null);
	const [tableData, setTableData] = useState([]);

	// 排序
	const changeSortHandler = (idx) => {
		if (headData[idx].sort) {
			const typeCount = headData[idx].type + 1;
			const temp = headData.map((data, index) => {
				data.sort && index !== idx && (data.type = 0);
				return data;
			});

			temp[idx].type = typeCount > 2 ? 0 : typeCount;

			const tempType = temp.find(({ sort, type }) => sort && type);
			const currType = tempType ? { name: tempType.key, type: tempType.type } : null;
			setcurrSort(currType);
			setHeadData(temp);
			sortByKey(currType);
		}
	};

	// data转格式
	const convertData = () => {
		const resultData = data
			? data.map((item) => {
          const { fakeUnit, init_cost, init_unit, realUnit, fakePercent } = item;
          const currCost = (init_cost * realUnit).toFixed(2)
					const fakeIncome =
						init_cost && !isNaN(fakeUnit)
							? Number((currCost * fakePercent) / 100).toFixed(2)
							: "--";
					const totalIncome =
						init_cost && init_unit ? Number(init_cost * (realUnit - init_unit)).toFixed(2) : "--";
					const hold = init_cost && init_unit ? Number(init_cost * init_unit).toFixed(2) : "--";
					const className = fakePercent.includes("-") ? "decrease" : "increase";

					return { ...item, fakeIncome, totalIncome, hold, className };
			  })
			: [];

		return resultData;
	};

	// 根据key排序
	const sortByKey = (key = currSort) => {
		let tempData = convertData(data);
		if (!key) {
			tempData = tempData.sort((a, b) => b["sort"] - a["sort"]);
		} else {
			const { name, type } = key;
			const noneData = tempData.filter((item) => item[name] === "--");
			const existData = tempData
				.filter((item) => item[name] !== "--")
				.sort((a, b) => (type === 2 ? a[name] - b[name] : b[name] - a[name]));
			tempData = [...existData, ...noneData];
		}

		setTableData(tempData);
	};

	const renderHeadJSX = () =>
		headData.map(({ name, sort, type }, idx) => (
			<span key={name} onClick={() => changeSortHandler(idx)}>
				{name}
				{sort && <i className={(type === 1 && "up") || (type === 2 && "down")}></i>}
			</span>
		));

	const renderItemJSX = () => {
		return tableData.map((item) => <WideItem key={item.id} data={item} user={user} />);
	};

	useEffect(() => {
		sortByKey();
	}, [data]);

	return (
		<Wrapper>
			<Head>{renderHeadJSX()}</Head>
			<Content>{renderItemJSX()}</Content>
		</Wrapper>
	);
};

export default WideTable;
