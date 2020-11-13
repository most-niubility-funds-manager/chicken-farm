import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Item from "./tableItem";
import { setSearchState } from "../../services";

const Wrapper = styled.div.attrs({ className: "list" })`
	width: 100%;
	height: 370px;
	overflow: overlay;

	&.long {
		height: 430px;
	}
`;

const Empty = styled.div`
	width: 100%;
	height: 95%;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 13px;
	color: var(--table-th);

	&.click-area {
		cursor: pointer;
		border-radius: 6px;
		border: 1px dashed var(--table-th);
		transition: all 0.18s linear;

		&:hover {
			color: var(--table-empty-hover);
			border: 1px dashed var(--table-empty-hover);
		}
	}
`;

const List = (props) => {
	const {
		data,
		user,
		tableType,
		setting: { marketState, incomeState },
	} = props;

	const className = (!tableType && !marketState) || (tableType && !incomeState) ? "long" : "";

	const gotoSearchHandler = () => setSearchState(true);

	const renderItemJSX = () => {
		return data.length ? (
			tableType ? (
				data.map((value) => <Item data={value} user={user} key={value.id}></Item>)
			) : (
				data.map((value) => <Item type={tableType} data={value} user={user} key={value.id}></Item>)
			)
		) : (
			<Empty className={!tableType && "click-area"} onClick={gotoSearchHandler}>
				{tableType ? "暂无基金" : "暂无基金，点击添加"}
			</Empty>
		);
	};

	return <Wrapper className={className}>{renderItemJSX()}</Wrapper>;
};

export default List;
