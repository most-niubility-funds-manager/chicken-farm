import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { changeListType } from '../../services'

const Wrapper = styled.div.attrs({ className: "table-head" })`
	width: 100%;
	height: 26px;
	display: grid;
	grid-template-columns: 86px 42px 1fr 100px;
	font-size: 13px;
	color: var(--table-th);
	margin-bottom: 8px;

	.value {
		text-align: right;
		line-height: 26px;
	}
`;

const ThMain = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	transition: all 0.18s linear;

	i {
		font-size: 14px;
		color: var(--table-th-icon);
	}

	&.active {
		color: var(--table-th-main-active);
		font-weight: 500;
		i {
			color: var(--table-th-main-active);
		}
	}
`;

const SortMenu = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	position: relative;

	.sort-enter {
		width: 84px;
		height: 26px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		transition: all 0.18s linear;
		cursor: pointer;

		i {
			transform: rotate(-90deg) scale(0.8);
			font-size: 14px;
			color: var(--table-th-icon);
			transition: all 0.18s linear;
		}

		&.active {
			background-color: var(--table-th-menu-bg);
			i {
				transform: rotate(90deg) scale(0.8);
			}
		}

		&:hover {
			background-color: var(--table-th-menu-bg);
		}
	}

	.sort-menu {
		position: absolute;
		top: 34px;
		right: 0;
		width: 84px;
		height: 0;
		padding: 4px 0;
		background-color: var(--table-th-menu-bg);
		border-radius: 6px;
		transition: all 0.1s linear;
		opacity: 0;
		overflow: hidden;

		.menu-item {
			height: 24px;
			font-size: 12px;
			text-align: right;
			line-height: 2;
			padding-right: 14px;
			cursor: pointer;

			&:hover {
				background-color: var(--table-th-menu-active);
			}
		}

		&.active {
			height: 104px;
			opacity: 1;
		}
	}
`;

const Head = (props) => {
	const [switchType, setSwitchType] = useState(false);
	const [currentSort, setCurrentSort] = useState({});
	const [sortList, setSortList] = useState([]);
	const [menuActive, setMenuActive] = useState(false);
	const timeOptions = [
		{ name: "预估" },
		{ name: "近7天" },
		{ name: "近1个月" },
		{ name: "近3个月" },
	];
	const sortOptions = [
		{ name: "预估收益" },
		{ name: "昨日收益" },
		{ name: "累计收益" },
		{ name: "金额排序" },
	];

	const switchTypeHandler = (state) => {
		const currentOptions = state ? [...sortOptions] : [...timeOptions];
		changeListType(state)
		setSwitchType(state);
		setSortList(currentOptions);
		setCurrentSort(currentOptions[0]);
	};

	const changeSortHandler = (idx) => {
		setCurrentSort(sortList[idx]);
		closeMenu();
	};

	const openMenu = () => setMenuActive(!menuActive);
	const closeMenu = () => setMenuActive(false);

	// 更换下拉菜单
	const renderOptionsJSX = () =>
		sortList.map(({ name }, i) => (
			<div className="menu-item" key={i} onClick={() => changeSortHandler(i)}>
				{name}
			</div>
		));

	useEffect(() => {
		switchTypeHandler(false);
	}, []);

	return (
		<Wrapper>
			<ThMain className={!switchType && "active"} onClick={() => switchTypeHandler(false)}>
				<i className="iconfont chicken-consumption1"></i>
				我的自选
			</ThMain>
			<ThMain className={switchType && "active"} onClick={() => switchTypeHandler(true)}>
				<i className="iconfont chicken-consumption"></i>
				持有
			</ThMain>
			<span className="value">{ switchType ? '' : '净值'}</span>
			{/* <SortMenu>
				<div className={`sort-enter ${menuActive && "active"}`} onClick={openMenu}>
					{currentSort.name}
					<i className="iconfont chicken-arrow-left"></i>
				</div>
				<div className={`sort-menu ${menuActive && "active"}`}>{renderOptionsJSX()}</div>
			</SortMenu> */}
		</Wrapper>
	);
};

export default Head;
