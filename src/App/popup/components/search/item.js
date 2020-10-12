/*
 * @Date: 2020-10-09 14:07:07
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-10-09 17:23:22
 * @Description: 查找结果
 */
import React, { useState } from "react";
import styled from "styled-components";
import { postFund } from "../../services";

const ItemBox = styled.div`
	width: 100%;
	height: 35px;
	padding-left: 1em;
	font-size: 13px;
	display: grid;
	grid-template-columns: 70px 1fr 60px;
	align-items: center;
	gap: 10px;
	margin-bottom: 5px;
	color: var(--search-input);
	background-color: var(--search-item-bg);
	border-radius: 2px;
	overflow: hidden;

	.btn {
		width: 100%;
		height: 100%;
		background-color: var(--search-item-btn);
		cursor: pointer;
		border-radius: 0 2px 2px 0;
		display: flex;
		align-items: center;
		justify-content: center;

		&.disabled {
			background-color: var(--search-item-btn-disabled);
			pointer-events: none;
		}
	}
`;

const Item = (props) => {
	const { user, fund } = props;
	const [disabled, setDisabled] = useState(false);
	const btnClassName = `btn ${disabled && "disabled"}`;
	const btnText = disabled ? "已添加" : "添加";

	const clickHandler = async (code) => {
		setDisabled(true);
		await postFund({ uid: user.uid, code });
	};

	return (
		<ItemBox>
			<span>{fund.scode}</span>
			<span>{fund.sname}</span>
			<span className={btnClassName} onClick={() => clickHandler(fund.scode)}>
				{btnText}
			</span>
		</ItemBox>
	);
};

export default Item;
