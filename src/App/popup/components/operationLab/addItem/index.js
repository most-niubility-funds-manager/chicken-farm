/*
 * @Date: 2020-07-22 15:02:57
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-06 16:13:42
 * @Description: 添加鸡精
 */

import React, { useState, useRef, useEffect } from "react";
import { Wrapper, Input, Button } from "./index.style";
import { convertCodeFetch } from "../../../services";
import { useDispatch, useSelector } from "react-redux";
import {
	setSearchLoading,
	setSearchResult,
	changeSearchState,
	updateForce,
} from "../../../redux/actions";

const AddFundItem = (props) => {
	const { theme } = props;
	const input = useRef(null);
	const dispatch = useDispatch();
	const forceUpdate = useSelector((state) => state.isSearchUpdate);

	useEffect(() => {
		input.current.value = "";
	}, [forceUpdate]);

	const keyDownHandler = (e) => {
		const { keyCode } = e;
		if (keyCode === 13) {
			submitHandler();
			e.preventDefault();
		}
	};

	const submitHandler = () => {
		const { value } = input.current;
		const spaceReg = /\s/g;
		const commaReg = /,|，/g;
		if (value.replace(spaceReg, "").length) {
			const code = value.split(commaReg).map((v) => v.replace(spaceReg, ""));
			dispatch(setSearchLoading(true));
			dispatch(changeSearchState(true));
			dispatch(updateForce(false));
			convertCodeFetch(code).then((_) => {
				dispatch(setSearchResult({ ..._ }));
				dispatch(setSearchLoading(false));
			});
		}
		return;
	};

	return (
		<Wrapper>
			<Input
				ref={input}
				theme={theme}
				placeholder="输入基金代码,多个基金可用逗号隔开"
				onKeyDown={keyDownHandler}
			/>
			<Button
				theme={theme}
				onClick={submitHandler}
				className="iconfont chicken-weibiaoti37"
			></Button>
		</Wrapper>
	);
};

export default AddFundItem;
