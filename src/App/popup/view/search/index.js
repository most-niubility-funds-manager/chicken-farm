/*
 * @Date: 2020-07-28 10:47:44
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-30 00:21:55
 * @Description: 搜索结果页
 */

import React, { useState, useEffect } from "react";
import {
	Wrapper,
	Mask,
	Content,
	CloseBtn,
	Title,
	ErrorPanel,
	ListWrapper,
	ListItem,
	BtnBox,
	Btn,
	Tips,
	LoadingWrapper,
} from "./index.style";
import { useSelector } from "react-redux";
import Loading from "../../components/loading";
import { updateSingleFund, addAllFunds } from "../../services";

const SearchPage = (props) => {
	const theme = useSelector((state) => state.theme);
	const isLoading = useSelector((state) => state.isSearchLoading);
	const { succ, fail } = useSelector((state) => state.searchData);
	const [listData, setListData] = useState([]);
	const { closeEvent } = props;

	useEffect(() => {
		succ && setListData(succ.map((v) => ({ ...v, active: false })));
	}, [succ]);

	const addFund = (idx) => {
		const fundData = { ...listData[idx] };
		const param = {
			name: fundData.name,
			code: fundData.code,
			unit: 0,
			state: 1,
			create: Date.now(),
		};

		addAllFunds([param]);
		setListData(listData.map((v, i) => ({ ...v, active: i === idx ? !v.active : v.active })));
	};

	const addAllFundsData = () => {
		const data = listData
			.filter(({ active }) => !active)
			.map(({ name, code }) => ({
				name,
				code,
				unit: 0,
				state: 1,
				create: Date.now(),
			}));
		listData.forEach((v) => (v.active = true));
		addAllFunds(data).then((_) => closeEvent());
	};

	return (
		<Wrapper>
			<Mask onClick={closeEvent}></Mask>
			<Content theme={theme}>
				<CloseBtn className="iconfont chicken-close" theme={theme} onClick={closeEvent} />
				<Title theme={theme}>查询结果:</Title>
				{/* 错误提示❌ */}
				{!isLoading && fail.length ? (
					<ErrorPanel theme={theme}>“{fail.join(",")}”等，查不到对应数据，请确认后重试</ErrorPanel>
				) : null}
				{isLoading ? (
					<LoadingWrapper>
						<Loading multi={2} />
					</LoadingWrapper>
				) : (
					<ListWrapper>
						{listData.map(({ code, name, active }, i) => (
							<ListItem theme={theme} key={code}>
								<span>{code}</span>
								<span style={{ "text-align": "left" }}>{name}</span>
								<BtnBox>
									<Btn theme={theme} onClick={() => addFund(i)} className={active && "disabled"}>
										{active ? "已添加" : "添加"}
									</Btn>
								</BtnBox>
							</ListItem>
						))}
					</ListWrapper>
				)}
				<Tips theme={theme}>
					注: 已过滤格式错误基金代码
					{listData.length > 1 && (
						<Btn theme={theme} onClick={addAllFundsData}>
							全部添加
						</Btn>
					)}
				</Tips>
			</Content>
		</Wrapper>
	);
};

export default SearchPage;
