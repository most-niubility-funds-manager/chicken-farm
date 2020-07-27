/*
 * @Date: 2020-07-21 16:44:10
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-27 00:17:00
 * @Description: 主页面
 */

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CHANGE_THEME } from "../../redux/actionTypes";
import { Wrapper, Content } from "./index.style";
import { theme } from "../../../styles";
import Constant from "../../../../constants";
import SectionGroup from "../../components/sectionGroup";
import OperationLab from "../../components/operationLab";
import FreeTable from "../../components/table";
import FooterBox from "../../components/footer";
import { createDB } from "../../services/indexDB";

const Home = () => {
	const userTheme = theme.dark;
	const dispatch = useDispatch();

	dispatch({ type: CHANGE_THEME, theme: userTheme });

  // 创建节假日表
	createDB({
		store: Constant.INDEX_STORE,
		table: Constant.INDEX_HOLIDAY,
		keyMap: { year: false, data: false },
	})

	return (
		<Wrapper theme={userTheme}>
			<Content>
				<SectionGroup />
				<OperationLab />
				<FreeTable />
			</Content>
			<FooterBox />
		</Wrapper>
	);
};

export default Home;
