/*
 * @Date: 2020-07-25 00:20:04
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-28 10:43:19
 * @Description: 重中之重 多功能表格
 */

import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { Wrapper } from "./index.style";
import SubTable from "./subTable";

const FreeTable = () => {
	const theme = useSelector((state) => state.theme);
	const TableEL = useRef(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeCode, setActiveCode] = useState(null)
	const config = [
		{
			title: "基金名称",
			dataIndex: "name",
			key: "name",
			width: 120,
			textAlign: "left",
      fixed: "left",
      keyword: true,  //  给颜色
		},
		{
			title: "涨跌幅",
			dataIndex: "crease",
			key: "crease",
			width: 70,
			textAlign: "right",
			tag: true,  //  给标签
		},
		{ title: "基金代码", dataIndex: "code", key: "code", width: 80, textAlign: "center" },
		{ title: "估算净值", dataIndex: "worth", key: "worth", width: 80, textAlign: "right" },
		{
			title: "持有份额",
			dataIndex: "totalShare",
			key: "totalShare",
			width: 80,
			textAlign: "right",
		},
		{
			title: "总仓估算",
			dataIndex: "totalReckon",
			key: "totalReckon",
			width: 100,
			textAlign: "right",
		},
		{
			title: "收益估算",
			dataIndex: "incomeReckon",
			key: "incomeReckon",
			width: 100,
			textAlign: "right",
		},
		{ title: "更新时间", dataIndex: "update", key: "update", width: 100, textAlign: "right" },
		// { title: '更多操作', key: 'operation', width:  }
	];

	const tableData = [
		{
			name: "....",
			crease: "-5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
		{
			name: "华夏中证5G通信主题ETF联接C",
			crease: "5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
		{
			name: "华夏中证5G通信主题ETF联接C",
			crease: "-5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
		{
			name: "华夏中证5G通信主题ETF联接C",
			crease: "-5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
		{
			name: "华夏中证5G通信主题ETF联接C",
			crease: "-5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
		{
			name: "华夏中证5G通信主题ETF联接C",
			crease: "-5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
		{
			name: "华夏中证5G通信主题ETF联接C",
			crease: "-5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
		{
			name: "华夏中证5G通信主题ETF联接C",
			crease: "-5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
		{
			name: "华夏中证5G通信主题ETF联接C",
			crease: "-5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
		{
			name: "华夏中证5G通信主题ETF联接C",
			crease: "-5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
		{
			name: "华夏中证5G通信主题ETF联接C",
			crease: "-5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
		{
			name: "华夏中证5G通信主题ETF联接C",
			crease: "-5.83%",
			code: "008087",
			worth: "1.2439",
			totalShare: "3000",
			totalReckon: "3600",
			incomeReckon: "-380.1",
			update: "07/24 15:00",
		},
	];

	const leftTable = config.filter(({ fixed }) => fixed === "left");
	const rightTable = config.filter(({ fixed }) => fixed === "right");

	const ScrollHandler = () => {
		const rect = TableEL.current.scrollTop;
		console.log("scrollTop", rect);
	};

	// 传给子组件
	const ListMouseEnterHandler = (index) => {
		console.log("列表hover", index);
		setActiveIndex(index);
  };
  // hover out
  const ListMouseLeaveHandler = () => {
    setActiveIndex(null)
  }
  // 点击事件 传基金代码
  const ListClickHandler = index => {
    const { code } = tableData[index]
    console.log('code', code)
    setActiveCode(code) 
  }

	return (
		<Wrapper ref={TableEL} onScroll={ScrollHandler}>
			<SubTable
				head={leftTable}
				position="left"
				theme={theme}
				data={tableData}
        hoverEvent={ListMouseEnterHandler}
        leaveEvent={ListMouseLeaveHandler}
        clickEvent={ListClickHandler}
				activeIndex={activeIndex}
			/>
			<SubTable
				head={config}
				theme={theme}
				data={tableData}
        hoverEvent={ListMouseEnterHandler}
        leaveEvent={ListMouseLeaveHandler}
        clickEvent={ListClickHandler}
				activeIndex={activeIndex}
			/>
			{!!rightTable.length && (
				<SubTable
					head={rightTable}
					position="right"
					theme={theme}
					hoverEvent={ListMouseEnterHandler}
				/>
			)}
		</Wrapper>
	);
};

export default FreeTable;
