import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllFundCodes, getFundRealTimeData } from "../../services";
import Saga from "@lib/saga";
import Head from "./tableHead";
import List from "./list";

const Wrapper = styled.div.attrs({ className: "content" })`
	width: 100%;
	height: auto;
`;

const Content = (props) => {
	const { user, tableType, setting, update } = props;
	const [codes, setCodes] = useState([]); //	原数据
	const [fundData, setFundData] = useState([]); //	基金数据
	const onlyCode = codes.map(({ code }) => code); //	只有code
	const realTimeSaga = new Saga(() => getFundRealTimeData(onlyCode));

	useEffect(() => {
		const fetchData = async () => {
			const originCodes = await getAllFundCodes(user.uid);
			const currentCodes = originCodes.filter((v) => (!tableType ? !!v.follow : !!v.init_cost));
			setCodes(currentCodes);
		};

		setFundData([]);
		!user ? setCodes([]) : fetchData();

	}, [user, tableType, update]);

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

	return (
		<Wrapper>
			<Head></Head>
			<List user={user} data={fundData} setting={setting} tableType={tableType}></List>
		</Wrapper>
	);
};

export default Content;
