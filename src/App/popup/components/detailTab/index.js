/*
 * @Date: 2020-08-01 12:34:49
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-01 16:14:17
 * @Description: tab页
 */

import React, { useState, useEffect } from "react";
import { Wrapper, Content } from "./index.style";
import TabNav from "./tabNav";
import Manager from "./manager";
import Hold from './hold'
import Unit from './unit'
import News from './news'

const Tab = (props) => {
	const { theme, fundIntro } = props;
	const [activeKey, setActiveKey] = useState("manager");
	const navList = [
		{ name: "基金经理", key: "manager" },
		{ name: "持仓分布", key: "hold" },
		{ name: "往日增幅", key: "unit" },
		{ name: "基金公告", key: "news" },
	];


	const tabMap = new Map([
		["manager", <Manager theme={theme} data={fundIntro.manager} />],
		["hold", <Hold theme={theme} data={fundIntro.holdShares} />],
		["unit", <Unit theme={theme} data={fundIntro.pastUnit} />],
		["news", <News theme={theme} data={fundIntro.newsList} />],
	]);

	const navClickHandler = (key) => {
		setActiveKey(key);
	};

	return (
		<Wrapper>
			<TabNav theme={theme} nav={navList} clickEvent={navClickHandler} />
			<Content theme={theme}>{Object.keys(fundIntro).length && tabMap.get(activeKey)}</Content>
		</Wrapper>
	);
};

export default Tab;
