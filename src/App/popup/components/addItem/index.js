/*
 * @Date: 2020-07-22 15:02:57
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-24 21:21:41
 * @Description: 添加鸡精
 */

import React, { useState, useRef, useEffect } from "react";
import { Wrapper, Input, Button } from "./index.style";
import { convertCodeFetch, fundFuzzyFetch, syncFundsActively } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { setSearchLoading, setSearchResult, updateForce } from "../../redux/actions";

const AddFundItem = (props) => {
	const { theme } = props;
	const input = useRef(null);
	const dispatch = useDispatch();
	const forceUpdate = useSelector((state) => state.isSearchUpdate);

	useEffect(() => {
		input.current.value = "";
		input.current.focus();
		syncFundsActively();
	}, [forceUpdate]);

	const keyDownHandler = (e) => {
		const { keyCode } = e;
		if (keyCode === 13) {
			keywordSubmitHandler();
			e.preventDefault();
		}
	};

	// 天天基金模糊查询
	const keywordSubmitHandler = () => {
		const { value } = input.current;
		dispatch(setSearchLoading(true));
		dispatch(updateForce(false));
		fundFuzzyFetch(value).then((_) => {
			_.length
				? dispatch(setSearchResult({ succ: [..._], fail: [] }))
				: dispatch(setSearchResult({ fail: [value], succ: [] }));
			dispatch(setSearchLoading(false));
		});
	};

	// 代码逗号分割批量添加
	const codeSubmitHandler = () => {
		const { value } = input.current;
		const spaceReg = /\s/g;
		const commaReg = /,|，/g;
		if (value.replace(spaceReg, "").length) {
			const code = value.split(commaReg).map((v) => v.replace(spaceReg, ""));
			dispatch(setSearchLoading(true));
			dispatch(updateForce(false));
			convertCodeFetch(code).then((_) => {
				dispatch(setSearchResult({ ..._ }));
				dispatch(setSearchLoading(false));
			});
		}
		return;
	};

	return (
		<Wrapper theme={theme}>
			<Input
				ref={input}
				theme={theme}
				placeholder="输入基金名称或代码,如: 白酒 161725"
				onKeyDown={keyDownHandler}
			/>
			<Button
				theme={theme}
				onClick={keywordSubmitHandler}
				className="iconfont chicken-search-fill"
			></Button>
		</Wrapper>
	);
};

export default AddFundItem;
