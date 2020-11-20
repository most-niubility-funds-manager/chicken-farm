import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
	setDetailState,
	setFundFollowState,
	getFundDetailData,
	getFundRealTimeData,
	setHoldState,
} from "../services";
import MainInfo from "../components/detail/main";
import Assets from "../components/detail/assets";
import Worth from "../components/detail/worth";
import Stock from "../components/detail/stock";
// import Trend from "../components/detail/trend";

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 0 16px 0;
	background-color: var(--detail-bg);
	transform: translateX(100%);
	transition: all 0.18s linear;
	z-index: 1;
	overflow: auto;

	&.active {
		transform: translateX(0);
	}
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
	color: var(--detail-title);
	background-color: var(--detail-bg);
	padding-top: 20px;
	margin-bottom: 20px;
	position: sticky;
	top: 0;

	.title {
		font-size: 16px;
		font-weight: 500;
		cursor: pointer;
		display: flex;
		align-items: center;

		i {
			font-size: 16px;
			color: var(--detail-title);
			margin-right: 4px;
		}
	}

	.btn-group {
		display: flex;
		align-items: center;
		gap: 12px;

		button {
			width: 56px;
			height: 32px;
			border-radius: 6px;
			background-color: var(--detail-button);
			color: var(--detail-button-color);
			font-size: 13px;
			transition: all 0.15s linear;
			cursor: pointer;

			&.disabled {
				background-color: var(--detail-button-disable);
				color: var(--detail-button-disable-color);
			}
		}
	}
`;

const Detail = (props) => {
	const {
		data: { state, code, followState, cost, unit },
		user,
	} = props;
	const [followed, setFollowed] = useState(false);
	const [fundStoreBase, setFundStoreBase] = useState({}); //	background获取的基本信息
	const [fundRealData, setFundRealData] = useState({}); //	单个基金实时数据
	const holdPageData = {
		code,
		cost,
		unit,
		uid: user && user.uid,
	};

	const closeHandler = () => setDetailState({ state: false });
	const toggleFollowState = () => {
		setFollowed(!followed);
		setFundFollowState({ uid: user.uid, code, state: !followed ? "1" : undefined, cost });
	};
	const openHoldPop = () => setHoldState({ state: true, data: holdPageData });

	useEffect(() => {
		setFollowed(!!followState);
		const fetchData = async () => {
			const _ = await getFundDetailData(code);
			const data = await getFundRealTimeData([code]);
			setFundStoreBase(_);
			setFundRealData(data[0]);
		};

		state && fetchData();
	}, [state]);

	return (
		<Wrapper className={state && "active"}>
			<Title>
				<div className="title" onClick={closeHandler}>
					<i className="iconfont chicken-arrow-left"></i>
					产品详情
				</div>
				<div className="btn-group">
					<button className={followed && "disabled"} onClick={toggleFollowState}>
						{followed ? "已关注" : "关注"}
					</button>
					<button onClick={openHoldPop}>持有</button>
				</div>
			</Title>
			<MainInfo realData={fundRealData} storeData={fundStoreBase}></MainInfo>
			{cost && <Assets data={{ cost, unit }} realData={fundRealData} storeData={fundStoreBase}></Assets>}
			<Worth data={fundStoreBase}></Worth>
			{fundStoreBase.stocks && <Stock data={fundStoreBase.stocks} state={state}></Stock>}
		</Wrapper>
	);
};

export default Detail;
