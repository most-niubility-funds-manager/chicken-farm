import React, { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { setSearchState, searchFund, setSettingState, setSortState } from "../../services";

const expandAnimate = keyframes`
	0% {
		width: calc(100% - 47px);
	}
	100% {
		width: 100%;
	}
`;

const Wrapper = styled.div.attrs({ className: "search-box" })`
	width: 100%;
	height: 36px;
	position: relative;
	margin-bottom: 8px;
`;

const InputWrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: calc(100% - 94px);
	height: 36px;
	border-radius: 6px;
	background-color: var(--search-input-bg);
	padding: 0 10px;
	cursor: pointer;
	transition: all 0.15s linear;

	.input-box {
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(95px);
		width: 42px;
		height: 100%;
		display: flex;
		align-items: center;
		transition: all 0.15s linear;
		padding: 0 10px;
	}

	i {
		color: var(--search-btn);
		font-size: 14px;
		margin-right: 4px;
		transition: all 0.15s linear;

		&.chicken-reeor-fill {
			position: absolute;
			opacity: 0;
			top: 50%;
			right: 10px;
			transform: translateY(-50%);
		}
	}

	input {
		width: 24px;
		height: 100%;
		font-size: 12px;
		background-color: transparent;
		transition: all 0.15s linear;
		caret-color: var(--search-input-caret);
		color: var(--search-input);

		&::placeholder {
			color: var(--search-input-placeholder);
		}
	}

	&:hover {
		i {
			color: var(--search-btn-hover);
		}
	}

	&.expand {
		animation: ${expandAnimate} 0.15s linear forwards;
		justify-content: flex-start;
		z-index: 1;

		.input-box {
			transform: translateX(0);
			width: 100%;
		}

		i {
			margin-right: 0;
			margin-left: 4px;
			opacity: 1;
		}

		input {
			width: 100%;
		}
	}
`;

const Btn = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 36px;
	height: 36px;
	border-radius: 6px;
	background-color: var(--search-btn-bg);
	color: var(--search-btn);
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 14px;
	cursor: pointer;
	transition: all 0.15s linear;

	&:hover {
		color: var(--search-btn-hover);
	}
`;

const SearchBox = (props) => {
	const { searchActive, user, followData } = props;
	const inputEl = useRef(null);

	const keyDownHandler = (e) => {
		const { keyCode } = e;
		const { value } = inputEl.current;

		if (keyCode === 13) {
			searchFund(value);
			e.preventDefault();
		} else if (keyCode === 8 && !value.length) {
			expandDeactiveHandler();
		}
	};

	// 激活搜索框
	const expandActiveHandler = () => {
		if (!searchActive) {
			setSearchState({ state: true });
		}
		inputEl.current.focus();
	};
	const expandDeactiveHandler = () => {
		if (searchActive) {
			setSearchState({ state: false, codes: followData, uid: user && user.uid });
		}
		inputEl.current.value = "";
	};
	// 打开设置
	const settingActiveHandler = () => setSettingState(true);
	// 打开排序
	const sortActiveHandler = () => setSortState(true)

	useEffect(() => {
		if (searchActive) {
			expandActiveHandler();
		} else {
			expandDeactiveHandler();
		}
	}, [searchActive]);

	return (
		<Wrapper>
			<InputWrapper className={searchActive && "expand"} onClick={expandActiveHandler}>
				<div className="input-box">
					{!searchActive && <i className="iconfont chicken-search"></i>}
					<input
						placeholder="搜索"
						ref={inputEl}
						onKeyDown={keyDownHandler}
						readOnly={!searchActive}
					/>
				</div>
				<i
					className={`iconfont chicken-reeor-fill ${searchActive && "active"}`}
					onClick={expandDeactiveHandler}
				></i>
			</InputWrapper>
			<Btn className="iconfont chicken-paixu" onClick={sortActiveHandler} style={{ right: "47px" }} />
			<Btn className="iconfont chicken-conditions" onClick={settingActiveHandler} />
		</Wrapper>
	);
};

export default SearchBox;
