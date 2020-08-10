/*
 * @Date: 2020-07-21 16:44:10
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-10 14:23:01
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
} from "../../redux/actions";
import { Wrapper, Content } from "./index.style";
import { theme } from "../../../styles";
import Constant from "../../../../constants";
import SectionGroup from "../../components/sectionGroup";
import OperationLab from "../../components/operationLab";
import FreeTable from "../../components/table";
import FooterBox from "../../components/footer";
import SearchPage from "../search";
import OperationPage from "../operationPanel";
import { createDB } from "../../services/indexDB";

const Home = () => {
	const userTheme = theme.dark;
	const holiday_table = { year: false, data: false };
	const funds_table = { code: false, name: false, unit: false, state: false, create: false };
	const trade_table = { code: false, name: false, unit: false, state: false, time: false };
	const config_table = { hide: false, sort: false, theme: false, notifiy: false, other: false };
	const isSearch = useSelector((state) => state.isSearch); //	是否在查询结果
	const activeFundCode = useSelector((state) => state.activeFundCode); //	是否激活详情面板
	const dispatch = useDispatch();
	const tables = {};
	const [searchClose, setSearchOpen] = useState(false);
	const [detailClose, setDetailOpen] = useState(false);

	useEffect(() => {
		isSearch && setSearchOpen(true);
	}, [isSearch]);

	useEffect(() => {
		activeFundCode && setDetailOpen(true);
	}, [activeFundCode]);

	dispatch(changeTheme(userTheme));

	tables[Constant.INDEX_HOLIDAY] = holiday_table;
	tables[Constant.INDEX_FUND] = funds_table;
	tables[Constant.INDEX_TRADE] = trade_table;

	// 创建节假日表
	createDB({
		store: Constant.INDEX_STORE,
		tables,
	});

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

	return (
		<Wrapper theme={userTheme}>
			<Content>
				<SectionGroup />
				<OperationLab />
				<FreeTable />
			</Content>
			<FooterBox />
			{/* 搜索结果页 */}
			{searchClose && <SearchPage active={isSearch} closeEvent={closeSearchPage} />}
			{/* 基金详情页 */}
			{detailClose && <OperationPage active={activeFundCode} closeEvent={closeOperationPage} />}
		</Wrapper>
	);
};

export default Home;
