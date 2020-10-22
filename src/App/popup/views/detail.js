import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setDetailState, setFundFollowState } from "../services";
import HoldPage from "../components/detail/hold";

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	padding: 20px 16px 0;
	background-color: var(--detail-bg);
	transform: translateX(100%);
	transition: all 0.18s linear;
	z-index: 1;

	&.active {
		transform: translateX(0);
	}
`;

const Title = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;

	color: var(--detail-title);

	margin-bottom: 20px;

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
	const [holdState, setHoldState] = useState(false);
	const holdPageData = {
		code,
		cost,
		unit,
		uid: user&& user.uid,
	};

	const closeHandler = () => setDetailState(false);
	const toggleFollowState = () => {
		setFollowed(!followed);
		setFundFollowState({ uid: user.uid, code, state: !followed ? "1" : undefined, cost });
	};

	useEffect(() => {
		setFollowed(!!followState);
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
					<button onClick={() => setHoldState(true)}>持有</button>
				</div>
			</Title>

			{/* 持有弹窗 */}
			<HoldPage
				active={holdState}
				data={holdPageData}
				closeEvent={() => setHoldState(false)}
			></HoldPage>
		</Wrapper>
	);
};

export default Detail;
