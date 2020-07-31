/*
 * @Date: 2020-07-21 16:44:10
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-31 15:02:14
 * @Description: 主页面
 */

import React, { useState, useEffect, version } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CHANGE_THEME, CHANGE_SEARCH_STATE, UPDATE_FORCE, SET_ACTIVE_TR } from "../../redux/actionTypes";
import { Wrapper, Content } from "./index.style";
import { theme } from "../../../styles";
import Constant from "../../../../constants";
import SectionGroup from "../../components/sectionGroup";
import OperationLab from "../../components/operationLab";
import FreeTable from "../../components/table";
import FooterBox from "../../components/footer";
import SearchPage from "../search"
import OperationPage from '../operationPanel'
import { createDB } from "../../services/indexDB";

const Home = () => {
	const userTheme = theme.dark;
	const holiday_table = { year: false, data: false };
	const funds_table = { code: false, name: false, unit: false, state: false, create: false };
	const trade_table = { code: false, name: false, unit: false, state: false, time: false };
	const isSearch = useSelector(state => state.isSearch)	//	是否在查询结果
	const activeFundCode = useSelector(state => state.activeFundCode)	//	是否激活详情面板
	const dispatch = useDispatch();
	const tables = {};

	dispatch({ type: CHANGE_THEME, theme: userTheme });

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
		dispatch({ type: CHANGE_SEARCH_STATE, state: false })
		dispatch({ type: UPDATE_FORCE, state: true })
	}

	const closeOperationPage = () => {
		dispatch({ type: SET_ACTIVE_TR, code: 0 })
	}

	return (
		<Wrapper theme={userTheme} className={activeFundCode && 'heightLimit'} >
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
			{/* 基金详情页 */}
			{
				// activeFundCode && 
				<OperationPage closeEvent={closeOperationPage} />
			}
		</Wrapper>
	);
};

export default Home;
