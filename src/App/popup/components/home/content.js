import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getAllFundCodes, getFundRealTimeData, getMarketStatus } from "../../services";
import Saga from "@lib/saga";
import Head from "./tableHead";
import Item from "./tableItem";

const Wrapper = styled.div.attrs({ className: "content" })`
	width: 100%;
	height: auto;
`;

const List = styled.div`
	width: 100%;
	height: 370px;
	overflow: overlay;

	&.long {
		height: 430px;
	}
`;

const Empty = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 13px;
	color: var(--table-th);
`;

const Content = (props) => {
	const { user, forceUpdate, tableType, setting } = props;
	const [codes, setCodes] = useState([]); //	原数据
	const [fundData, setFundData] = useState([]); //	基金数据
	const onlyCode = codes.map(({ code }) => code); //	只有code
	const realTimeSaga = new Saga(() => getFundRealTimeData(onlyCode));
	// const marketStatusSaga = new Saga(getMarketStatus)

	useEffect(() => {
		const fetchData = async () => {
			const originCodes = await getAllFundCodes(user.uid);
			const currentCodes = originCodes.filter((v) => (!tableType ? !!v.follow : !!v.init_cost));
			setCodes(currentCodes);
		};
		setFundData([]);
		user && user.uid && fetchData();
	}, [user, forceUpdate, tableType]);

	useEffect(() => {
		codes.length &&
			realTimeSaga.start((data) => {
				setFundData(data);
			}, 5000);

		return () => {
			realTimeSaga.stop();
		};
	}, [codes]);

	const renderItemJSX = () =>
		codes.length ? (
			fundData.map((data, i) => <Item type={tableType} data={data} base={codes[i]} refreshTotal={forceUpdate}></Item>)
		) : (
			<Empty>暂无基金</Empty>
		);

	const renderListJSX = () => {
		const { marketState, incomeState } = setting;
		const className = (!tableType && !marketState) || (tableType && !incomeState) ? "long" : "";

		return <List className={className}>{renderItemJSX()}</List>;
	};

	return (
		<Wrapper>
			<Head></Head>
			{renderListJSX()}
		</Wrapper>
	);
};

export default Content;
