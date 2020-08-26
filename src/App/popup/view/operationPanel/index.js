/*
 * @Date: 2020-07-31 14:08:49
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-22 16:09:15
 * @Description: 每支基金的操作和基本信息面板
 */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Wrapper, Mask, Content, CloseBtn, Title, DelBtn } from "./index.styled";
import { fetchFundDetail, getUserSingleFundData, deleteSingleFund, syncFundsActively } from "../../services";
import Tab from "../../components/detailTab";

const Operation = (props) => {
	const { closeEvent, active } = props;
	const theme = useSelector((state) => state.theme);
	const activeCode = useSelector((state) => state.activeFundCode);
	const [fundIntro, setFundIntro] = useState({});
	const [userFundDetail, setUserFundDetail] = useState({});

	useEffect(() => {
		fetchFundDetail(activeCode).then((_) => {
			setFundIntro(Object.assign({}, _));
		});
		getUserSingleFundData(activeCode).then((_) => {
			setUserFundDetail(Object.assign({}, _));
		});
	}, [activeCode]);

	const deleteClickHandler = () => {
		deleteSingleFund(activeCode).then(() => {
			syncFundsActively();
			closeEvent();
		});
	};

	return (
		<Wrapper>
			<Mask />
			<Content theme={theme} className={!active && "cancel"}>
				<CloseBtn className="iconfont chicken-close" theme={theme} onClick={closeEvent} />
				<Title theme={theme}>
					{userFundDetail.name}-{activeCode}
					<DelBtn theme={theme} onClick={deleteClickHandler}>
						删除
					</DelBtn>
				</Title>
				<Tab theme={theme} fundIntro={fundIntro} />
			</Content>
		</Wrapper>
	);
};

export default Operation;
