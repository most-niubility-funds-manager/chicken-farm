/*
 * @Date: 2020-07-21 16:44:10
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-09-03 11:48:00
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
import SectionGroup from "../../components/sectionGroup";
import NewsBar from "../../components/newsBar";
import FreeTable from "../../components/table";
import FooterBox from "../../components/footer";
import SearchPage from "../search";
import OperationPage from "../operationPanel";
import ImportCard from "../../components/importCard";

const Home = () => {
	const dispatch = useDispatch();
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

	// 关闭搜索框后更新tableData, 清空search
	const closeSearchPage = () => {
		dispatch(changeSearchState(false));
		dispatch(setSearchResult({ succ: [], fail: [] }));
		setTimeout(() => {
			dispatch(updateForce(true));
			setSearchOpen(false);
			dispatch(updateForce(false));
		}, 200);
	};

	const closeOperationPage = () => {
		dispatch(setActiveTr(0));
		setTimeout(() => {
			dispatch(updateForce(true));
			setDetailOpen(false);
			dispatch(updateForce(false));
		}, 200);
	};

	const closeImportCard = () => {
		dispatch(setImportState(false));
		setTimeout(() => {
			dispatch(updateForce(true));
			setImportOpen(false);
			dispatch(updateForce(false));
		}, 200);
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
