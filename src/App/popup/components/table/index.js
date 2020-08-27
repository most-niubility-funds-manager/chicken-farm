/*
 * @Date: 2020-07-25 00:20:04
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-27 16:29:08
 * @Description: 重中之重 多功能表格
 */
import React, { useEffect, useState, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setActiveTr, updateForce, setTotalIncome, setTotalCrease } from "../../redux/actions";
import { Wrapper, LoadingWrapper, EmptyFund } from "./index.style";
import { getFundsCode, fetchAllFunds, updateSingleFund, syncFundsActively } from "../../services";
import { requestRecursion, sortData } from "../../../../utils";
import SubTable from "./subTable";
import Loading from "../loading";

const FreeTable = () => {
	const theme = useSelector((state) => state.theme);
	const forceUpdate = useSelector((state) => state.isSearchUpdate);
	const isMarketOpen = useSelector((state) => state.isMarketOpen);
	const currentSort = useSelector((state) => state.sortKey); //	当前排序方式
	const dispatch = useDispatch();
	const TableEL = useRef(null);
	const [activeIndex, setActiveIndex] = useState(null);
	const [tableData, setTableData] = useState([]);
	const [isEmpty, setIsEmpty] = useState(false);
	let fakeTimer = null

	const intervalCheck = () => !isMarketOpen || isEmpty;

	const config = [
		{
			title: "基金名称",
			dataIndex: "name",
			key: "name",
			width: 130,
			textAlign: "left",
			fixed: "left",
			keyword: true, //  给颜色
			sort: true, //	排序
		},
		{
			title: "涨跌幅",
			dataIndex: "crease",
			key: "crease",
			width: 80,
			textAlign: "right",
			fixed: "left",
			tag: true, //  给标签
			sort: true,
		},
		// { title: "基金代码", dataIndex: "code", key: "code", width: 80, textAlign: "center" },
		{
			title: "持有份额",
			dataIndex: "totalShare",
			key: "totalShare",
			width: 100,
			textAlign: "right",
			input: true,
		},
		{
			title: "收益估算",
			dataIndex: "incomeReckon",
			key: "incomeReckon",
			width: 100,
			textAlign: "right",
			tag: true,
			sort: true,
		},
		{ title: "净值", dataIndex: "lastUnit", key: "lastUnit", width: 80, textAlign: "right" },
		{ title: "估值", dataIndex: "currUnit", key: "currUnit", width: 80, textAlign: "right" },
		{
			title: "持仓成本",
			dataIndex: "totalAmount",
			key: "totalAmount",
			width: 100,
			textAlign: "right",
		},
		// { title: "更新时间", dataIndex: "update", key: "update", width: 100, textAlign: "right" },
	];

	const poll = async (fn, cb) => {
		const result = await fn();

		if (Object.prototype.toString.call(result) !== "[object Promise]") {
			if (intervalCheck()) {
				clearTimeout(fakeTimer);
				cb(result);
				return;
			} else {
				fakeTimer = setTimeout(() => {
					poll(fn, cb);
				}, 3000);
				cb(result);
			}
		}
	};

	// 获取 funds { code, unit } 后获取数据并格式化
	// 之后再加上排序
	const getIndexedFunds = async () =>
		getFundsCode()
			.then((codes) => {
				if (codes.length) {
					setIsEmpty(false);
					return fetchAllFunds(codes);
				} else {
					setIsEmpty(true);
					return [];
				}
			})
			.then((data) => sortData(data, currentSort));

	useEffect(() => {
		poll(getIndexedFunds, (data) => {
			const tempTableData = [];
			data.map((v, i) => {
				if (v.name) {
					return (tempTableData[i] = Object.assign({}, v));
				} else {
					const { code } = v;
					const lastValueIndex = tableData.findIndex((v) => v.code === code);
					return (tempTableData[i] = Object.assign({}, tableData[lastValueIndex]));
				}
			});
			setTableData(tempTableData);
			calcTotalIncome(tempTableData);
		});

		return () => {
			clearTimeout(fakeTimer)
		}
	}, [isMarketOpen, forceUpdate, currentSort]);

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
		updateSingleFund({ unit }, { k: "code", v: code }).then((_) => syncFundsActively());
	};
	// 总收益
	const calcTotalIncome = (data) => {
		const todayIncome = data.reduce((total, { crease, totalShare, lastUnit }) => {
			const currIncome = totalShare ? (crease.replace("%", "") * totalShare * lastUnit) / 100 : 0.0;
			total = total + Number(currIncome);
			return !isNaN(total) && (total = total.toFixed(2)), +total;
		}, 0);
		// 上次总额
		const lastTotal = data.reduce((total, { totalShare, lastUnit }) => {
			const assets = totalShare * lastUnit;
			total = Number(total) + Number(assets);
			return total.toFixed(2);
		}, 0);
		// 涨跌幅
		const todayCrease = ((todayIncome / lastTotal) * 100).toFixed(2);

		dispatch(setTotalCrease(todayCrease));
		dispatch(setTotalIncome(todayIncome));
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
				activeIndex={activeIndex}
			/>
		</Wrapper>
	);
};

export default FreeTable;
