/*
 * @Date: 2020-07-31 14:08:49
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-06 18:02:25
 * @Description: 每支基金的操作和基本信息面板
 */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Wrapper, Mask, Content, CloseBtn, Title } from "./index.styled";
import { fetchFundDetail, getUserSingleFundData } from "../../services";
import Tab from '../../components/detailTab'
import UnitForm from '../../components/changeUnit'

const Operation = (props) => {
	const { closeEvent } = props;
	const theme = useSelector((state) => state.theme);
	const activeCode = useSelector((state) => state.activeFundCode);
  const [fundIntro, setFundIntro] = useState({});
  const [userFundDetail, setUserFundDetail] = useState({})

	useEffect(() => {
    fetchFundDetail(activeCode).then((_) => {
      console.log('fundIntro', _)
      setFundIntro(Object.assign({}, _))
    });
    getUserSingleFundData(activeCode).then(_ => {
      console.log('userFundDetail', _)
      setUserFundDetail(Object.assign({}, _))
    })
	}, [activeCode]);

	return (
		<Wrapper>
			<Mask />
			<Content theme={theme}>
				<CloseBtn className="iconfont chicken-close" theme={theme} onClick={closeEvent} />
        <Title theme={theme}>{userFundDetail.name}-{activeCode}</Title>
        <Tab theme={theme} fundIntro={fundIntro} />
				<UnitForm theme={theme} />
			</Content>
		</Wrapper>
	);
};

export default Operation;
