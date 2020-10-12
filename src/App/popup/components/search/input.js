import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: "search-box" })`
	width: 100%;
	height: 36px;
	border-radius: 6px;
	border: 1px solid var(--search-input-bg);
	overflow: hidden;
	display: grid;
	grid-template-columns: 1fr 80px;
	background-color: var(--search-input-bg);

	input {
		width: 100%;
		height: 100%;
		font-size: 14px;
		padding: 0 1em;
		color: var(--search-input);
		background-color: transparent;

		&::placeholder {
			color: var(--search-input-placeholder);
		}
	}

	.btn {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 14px;
		background-color: var(--search-btn);
		color: var(--search-input);
		cursor: pointer;
		gap: 4px;
	}
`;

const SearchBox = (props) => {
	const inputEl = useRef(null);
	const { searchEvent, active } = props;

	const keyDownHandler = (e) => {
		const { keyCode } = e;
		if (keyCode === 13) {
			clickHandler();
			e.preventDefault();
		}
	};
	const clickHandler = () => {
		const { value } = inputEl.current;
		searchEvent(value);
	};

	useEffect(() => {
		inputEl.current.value = ""
		inputEl.current.focus()
	}, [active])

	return (
		<Wrapper>
			<input
				placeholder="输入基金名称或代码，如：白酒 161725"
				ref={inputEl}
				onKeyDown={keyDownHandler}
			/>
			<span className="btn" onClick={clickHandler}>
				<i className="iconfont chicken-search-fill"></i>查找
			</span>
		</Wrapper>
	);
};

export default SearchBox;
