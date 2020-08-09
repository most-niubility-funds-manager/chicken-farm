/*
 * @Date: 2020-07-25 00:20:04
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-09 15:45:42
 * @Description: 重中之重 多功能表格
 */
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
	setActiveTr,
	changeDeleteState,
	setDeleteCode,
	updateForce,
	setTotalIncome,
} from "../../redux/actions";
import { Wrapper, LoadingWrapper, EmptyFund } from "./index.style";
import { getFundsCode, fetchAllFunds, updateSingleFund } from "../../services";
import { requestRecursion } from "../../../../utils";
import SubTable from "./subTable";
import Loading from "../loading";

const FreeTable = () => {
	const theme = useSelector((state) => state.theme);
	const forceUpdate = useSelector((state) => state.isSearchUpdate);
	const isMarketOpen = useSelector((state) => state.isMarketOpen);
	const dispatch = useDispatch();
	const TableEL = useRef(null);
	const [activeIndex, setActiveIndex] = useState(null);
	const [tableData, setTableData] = useState([]);
	const [isEmpty, setIsEmpty] = useState(false);
	const intervalCheck = () => !isMarketOpen || isEmpty;

	useEffect(() => {
		requestRecursion(getIndexedFunds, intervalCheck, 5000, (datas) => {
			const tempTableData = [];
			datas.map((v, i) => {
				if (v.name) {
					return (tempTableData[i] = Object.assign({}, v));
				} else {
					const { code } = v;
					const lastValueIndex = tableData.findIndex((v) => v.code === code);
					return (tempTableData[i] = Object.assign({}, tableData[lastValueIndex]));
				}
			});
			setTableData(tempTableData);
			calcTotalIncome(tempTableData)
		});
	}, [isMarketOpen, forceUpdate]);

	const config = [
		{
			title: "基金名称",
			dataIndex: "name",
			key: "name",
			width: 120,
			textAlign: "left",
			fixed: "left",
			keyword: true, //  给颜色
		},
		{
			title: "涨跌幅",
			dataIndex: "crease",
			key: "crease",
			width: 90,
			textAlign: "right",
			fixed: "left",
			tag: true, //  给标签
		},
		// { title: "基金代码", dataIndex: "code", key: "code", width: 80, textAlign: "center" },
		{ title: "昨日净值", dataIndex: "lastUnit", key: "lastUnit", width: 80, textAlign: "right" },
		{ title: "估算净值", dataIndex: "currUnit", key: "currUnit", width: 80, textAlign: "right" },
		{
			title: "持有份额",
			dataIndex: "totalShare",
			key: "totalShare",
			width: 100,
			textAlign: "right",
			input: true,
		},
		// {
		// 	title: "总仓估算",
		// 	dataIndex: "totalReckon",
		// 	key: "totalReckon",
		// 	width: 100,
		// 	textAlign: "right",
		// },
		{
			title: "收益估算",
			dataIndex: "incomeReckon",
			key: "incomeReckon",
			width: 100,
			textAlign: "right",
			tag: true,
		},
		{ title: "更新时间", dataIndex: "update", key: "update", width: 100, textAlign: "right" },
		{
			title: "删除",
			dataIndex: "delete",
			key: "delete",
			width: 60,
			textAlign: "center",
			btn: "删除",
		},
	];

	// 获取 funds { code, unit } 后获取数据并格式化
	// 之后再加上排序
	const getIndexedFunds = async () =>
		getFundsCode().then((codes) => {
			if (codes.length) {
				setIsEmpty(false);
				return fetchAllFunds(codes);
			} else {
				setIsEmpty(true);
				return [];
			}
		});

	const leftTable = config.filter(({ fixed }) => fixed === "left");

	const ScrollHandler = () => {
		const rect = TableEL.current.scrollTop;
	};

	// 传给子组件
	const ListMouseEnterHandler = (index) => {
		setActiveIndex(index);
	};
	// hover out
	const ListMouseLeaveHandler = () => {
		setActiveIndex(null);
	};
	// 点击事件 传基金代码 展示基金详情
	const openDetailClickHandler = (index) => {
		const { code } = tableData[index];
		dispatch(setActiveTr(code));
	};
	const modifyUnitClickHandler = (index) => {
		console.log("无用点击", index);
	};
	const modifyUnitBlurHandler = (index, unit) => {
		const { code } = tableData[index];
		updateSingleFund({ unit }, { k: "code", v: code });
	};
	const deleteClickHandler = (index) => {
		const { code } = tableData[index];
		console.log("点击调用删除弹窗", code);
		dispatch(setDeleteCode(code));
		dispatch(changeDeleteState(true));
		dispatch(updateForce(false));
	};
	// 总收益
	const calcTotalIncome = (data) => {
		const total = data.reduce((total, { crease, totalShare, lastUnit }) => {
			const currIncome = totalShare ? ((crease.replace('%', '') * totalShare * lastUnit) / 100).toFixed(2) : 0.0;
			total = total + Number(currIncome);
			return total;
		}, 0);
		dispatch(setTotalIncome(total));
	};

	return (
		<Wrapper ref={TableEL} onScroll={ScrollHandler} className={!tableData.length && "loading"}>
			{!tableData.length && !isEmpty && (
				<LoadingWrapper theme={theme}>
					<Loading multi={3} />
				</LoadingWrapper>
			)}
			{isEmpty && <EmptyFund theme={theme}>您的基金列表空空如也</EmptyFund>}
			<SubTable
				head={leftTable}
				position="left"
				theme={theme}
				data={tableData}
				hoverEvent={ListMouseEnterHandler}
				leaveEvent={ListMouseLeaveHandler}
				clickEvent={openDetailClickHandler}
				activeIndex={activeIndex}
			/>
			<SubTable
				head={config}
				theme={theme}
				data={tableData}
				hoverEvent={ListMouseEnterHandler}
				leaveEvent={ListMouseLeaveHandler}
				clickEvent={modifyUnitClickHandler}
				blurEvent={modifyUnitBlurHandler}
				delEvent={deleteClickHandler}
				activeIndex={activeIndex}
			/>
		</Wrapper>
	);
};

export default FreeTable;
