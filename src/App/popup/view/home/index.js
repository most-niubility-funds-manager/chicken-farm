/*
 * @Date: 2020-07-21 16:44:10
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-05 23:34:13
 * @Description: 主页面
 */

import React, { useState, useEffect, version } from "react";
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
	const isSearch = useSelector((state) => state.isSearch); //	是否在查询结果
	const activeFundCode = useSelector((state) => state.activeFundCode); //	是否激活详情面板
	const dispatch = useDispatch();
	const tables = {};

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
		dispatch(updateForce(true));
		dispatch(setSearchResult({ succ: [], fail: [] }));
	};

	const closeOperationPage = () => {
		dispatch(setActiveTr(0));
	};

	return (
		<Wrapper theme={userTheme} className={activeFundCode && "heightLimit"}>
			<Content>
				<SectionGroup />
				<OperationLab />
				<FreeTable />
			</Content>
			<FooterBox />
			{/* 搜索结果页 */}
			{isSearch && <SearchPage closeEvent={closeSearchPage} />}
			{/* 基金详情页 */}
			{activeFundCode && <OperationPage closeEvent={closeOperationPage} />}
		</Wrapper>
	);
};

export default Home;
