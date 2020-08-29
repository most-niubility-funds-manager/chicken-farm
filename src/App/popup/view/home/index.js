/*
 * @Date: 2020-07-21 16:44:10
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-29 11:23:12
 * @Description: 主页面
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	changeTheme,
	changeSearchState,
	updateForce,
	setActiveTr,
	setSearchResult,
	setSortKey,
	setImportState,
	toggleWideScreen,
} from "../../redux/actions";
import { Wrapper, Content } from "./index.style";
import { theme } from "../../../styles";
import Constant from "../../../../constants";
import { getLocal } from "../../services/localStorage";
import { addAllFunds, updateSingleFund, convertCodeFetch, getSyncStorage } from "../../services";
import SectionGroup from "../../components/sectionGroup";
import NewsBar from "../../components/newsBar";
import FreeTable from "../../components/table";
import FooterBox from "../../components/footer";
import SearchPage from "../search";
import OperationPage from "../operationPanel";
import ImportCard from "../../components/importCard";
import { createDB } from "../../services/indexDB";

const Home = () => {
	const tables = {};
	const dispatch = useDispatch();
	const holiday_table = { year: false, data: false };
	const funds_table = { code: false, name: false, unit: false, state: false, create: false };
	const trade_table = { code: false, name: false, unit: false, state: false, time: false };
	const stateTheme = useSelector((state) => state.theme);
	const isSearch = useSelector((state) => state.isSearch); //	是否在查询结果
	const isImport = useSelector((state) => state.isImport); //	是否开启导入
	const isWideScreen = useSelector((state) => state.isWideScreen); //	是否宽屏
	const activeFundCode = useSelector((state) => state.activeFundCode); //	是否激活详情面板
	const localConfig = getLocal(Constant.LOCAL_CONFIG);
	const [searchClose, setSearchOpen] = useState(false);
	const [detailClose, setDetailOpen] = useState(false);
	const [importClose, setImportOpen] = useState(false);
	const localSort = (localConfig && localConfig.sort) || "name_0";

	useEffect(() => {
		isSearch && setSearchOpen(true);
	}, [isSearch]);

	useEffect(() => {
		activeFundCode && setDetailOpen(true);
	}, [activeFundCode]);

	useEffect(() => {
		isImport && setImportOpen(true);
	}, [isImport]);

	dispatch(setSortKey(localSort));
	dispatch(changeTheme((localConfig && theme[localConfig.theme]) || theme["dark"]));
	dispatch(toggleWideScreen((localConfig && localConfig.wideScreen) || false));

	tables[Constant.INDEX_HOLIDAY] = holiday_table;
	tables[Constant.INDEX_FUND] = funds_table;
	tables[Constant.INDEX_TRADE] = trade_table;
	// 创建节假日表、基金表、交易表
	createDB({
		store: Constant.INDEX_STORE,
		tables,
	}).then((_) => syncCloudFunds());

	// 关闭搜索框后更新tableData, 清空search
	const closeSearchPage = () => {
		dispatch(changeSearchState(false));
		dispatch(setSearchResult({ succ: [], fail: [] }));
		setTimeout(() => {
			dispatch(updateForce(true));
			setSearchOpen(false);
		}, 200);
	};

	const closeOperationPage = () => {
		dispatch(setActiveTr(0));
		setTimeout(() => {
			setDetailOpen(false);
		}, 200);
	};

	const closeImportCard = () => {
		dispatch(setImportState(false));
		setTimeout(() => {
			setImportOpen(false);
		}, 200);
	};

	// 同步云端数据
	// funds [{ code, unit }]
	const syncCloudFunds = async () => {
		const funds = await getSyncStorage(Constant.SYNC_FUNDS);
		if (!funds) {
			return;
		}

		const { succ } = await convertCodeFetch(funds.map(({ code }) => code));
		const fundData = succ.map(({ code, name }) => {
			const { unit } = funds.find(({ code: c }) => code === c);
			return {
				code,
				unit,
				name,
				state: 1,
				create: Date.now(),
			};
		});

		// 若有新增基金，加入表同时改变了份额；再逐个更新一遍数据
		addAllFunds(fundData).then((_) =>
			Promise.all(
				fundData.map(({ unit, code }) => updateSingleFund({ unit }, { k: "code", v: code }))
			)
		);
	};

	return (
		<Wrapper theme={stateTheme} className={isWideScreen && "wideScreen"}>
			<Content>
				<SectionGroup />
				<NewsBar />
				<FreeTable />
			</Content>
			<FooterBox />
			{/* 搜索结果页 */}
			{searchClose && <SearchPage active={isSearch} closeEvent={closeSearchPage} />}
			{/* 基金详情页 */}
			{detailClose && <OperationPage active={activeFundCode} closeEvent={closeOperationPage} />}
			{/* 数据导入 */}
			{importClose && <ImportCard active={isImport} closeEvent={closeImportCard} />}
		</Wrapper>
	);
};

export default Home;
