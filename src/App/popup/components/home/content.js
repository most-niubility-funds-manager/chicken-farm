import React, { useState, useEffect, Fragment } from "react";
import styled from "styled-components";
import { getAllFundCodes, getFundRealTimeData } from "../../services";
import Saga from "@lib/saga";
import Head from "./tableHead";
import List from "./list";
import WideTable from "./wideTable";

const Wrapper = styled.div.attrs({ className: "content" })`
	width: 100%;
	height: auto;
`;

const Content = (props) => {
	const { user, tableType, setting, update } = props;
	const [codes, setCodes] = useState([]); //	原数据
	const [fundData, setFundData] = useState([]); //	基金数据
	const onlyCode = codes.sort((a, b) => b["sort"] - a["sort"]).map(({ code }) => code); //	只有code
	const realTimeSaga = new Saga(() => getFundRealTimeData(onlyCode));

	useEffect(() => {
		const fetchData = async () => {
			const originCodes = await getAllFundCodes(user.uid);
			const currentCodes = setting.wideMode
				? originCodes
				: originCodes.filter((v) => (!tableType ? !!v.follow : !!v.init_cost));
			setCodes(currentCodes);
		};

		setFundData([]);
		!user ? setCodes([]) : fetchData();
	}, [user, tableType, update, setting]);

	useEffect(() => {
		user &&
			codes.length &&
			realTimeSaga.start((data) => {
				const combineData = codes.map((c) => {
					const { code } = c;
					const val = data.find((v) => v.code === code);
					return { ...c, ...val };
				});
				setFundData(combineData);
			}, 5000);

		return () => {
			realTimeSaga.stop();
		};
	}, [codes]);

	const renderTableJSX = () => {
		if (setting.wideMode) {
			return <WideTable user={user} data={fundData}></WideTable>;
		} else {
			return (
				<Fragment>
					<Head></Head>
					<List user={user} data={fundData} setting={setting} tableType={tableType}></List>
				</Fragment>
			);
		}
	};

	return <Wrapper>{renderTableJSX()}</Wrapper>;
};

export default Content;
