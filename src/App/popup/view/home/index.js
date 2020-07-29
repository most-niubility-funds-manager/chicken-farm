/*
 * @Date: 2020-07-21 16:44:10
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-28 15:00:51
 * @Description: 主页面
 */

import React, { useState, useEffect, version } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_THEME, CHANGE_SEARCH_STATE } from "../../redux/actionTypes";
import { Wrapper, Content } from "./index.style";
import { theme } from "../../../styles";
import Constant from "../../../../constants";
import SectionGroup from "../../components/sectionGroup";
import OperationLab from "../../components/operationLab";
import FreeTable from "../../components/table";
import FooterBox from "../../components/footer";
import SearchPage from "../search"
import { createDB } from "../../services/indexDB";

const Home = () => {
	const userTheme = theme.dark;
	const holiday_table = { year: false, data: false };
	const funds_table = { code: false, name: false, unit: false, state: false, create: false };
	const trade_table = { code: false, name: false, unit: false, state: false, time: false };
	const tables = {};
	const dispatch = useDispatch();
	const isSearch = useSelector(state => state.isSearch)	//	是否在查询结果

	dispatch({ type: CHANGE_THEME, theme: userTheme });

	tables[Constant.INDEX_HOLIDAY] = holiday_table;
	tables[Constant.INDEX_FUND] = funds_table;
	tables[Constant.INDEX_TRADE] = trade_table;
	// 创建节假日表
	createDB({
		store: Constant.INDEX_STORE,
		tables,
	});

	const closeSearchPage = () => dispatch({ type: CHANGE_SEARCH_STATE, state: false })

	return (
		<Wrapper theme={userTheme}>
			<Content>
				<SectionGroup />
				<OperationLab />
				<FreeTable />
			</Content>
			<FooterBox />
			{/* 搜索结果页 */}
			{
				isSearch && <SearchPage closeEvent={closeSearchPage} />
			}
		</Wrapper>
	);
};

export default Home;
