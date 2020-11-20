/*
 * @Date: 2020-11-17 21:13:00
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-20 12:57:54
 * @Description: 排序页面
 */
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { setSortState, getAllFundCodes, getFundRealTimeData, updateFundSort } from "../services";
import Item from "../components/sort/item";
import DeletePanel from "../components/sort/delete";

const Wrapper = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: var(--sort-bg);
	transform: translateX(100%);
	transition: all 0.18s linear;
	z-index: 1;
	overflow: auto;

	&.active {
		transform: translateX(0);
	}
`;

const Head = styled.div`
	padding: 20px 16px 0;
	display: flex;
	align-items: center;
	font-size: 16px;
	font-weight: 500;
	color: var(--sort-title);
	cursor: pointer;
	margin-bottom: 20px;
	gap: 4px;

	i {
		color: var(--sort-title);
		font-size: 16px;
	}
`;

const Content = styled.div`
	width: 100%;
	height: 422px;
	overflow: auto;
	display: flex;
	flex-direction: column;
	position: relative;
`;

const Mask = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
`;

const Footer = styled.div`
	width: 100%;
	height: 40px;
	padding: 0 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

const SelectIcon = styled.div`
	width: 14px;
	height: 14px;
	border-radius: 50%;
	border: 1px solid var(--sort-select-border);
	display: flex;
	align-items: center;
	justify-content: center;

	i {
		font-size: 12px;
		color: var(--sort-select);
		opacity: 0;
	}

	&.active {
		border: none;
		background-color: var(--sort-select-active);
		i {
			opacity: 1;
		}
	}
`;

const SelectBox = styled.div`
	width: 50px;
	height: 100%;
	display: flex;
	align-items: center;
	gap: 4px;
	font-size: 13px;
	color: var(--sort-select);
	cursor: pointer;
`;

const BtnGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;

	button {
		width: 60px;
		height: 30px;
		border-radius: 6px;
		font-size: 13px;
		color: var(--sort-btn);
		background-color: var(--sort-btn-blue);
		cursor: pointer;
		transition: all 0.18s;

		&.red {
			background-color: var(--sort-btn-red);

			&.active {
				opacity: 0.5;
			}
		}
	}
`;

const SortPage = ({ active, user }) => {
	const contentEl = useRef(null);
	const [sortData, setSortData] = useState([]);
	const [isDrag, setDragState] = useState(false);
	const [dragIndex, setDragIndex] = useState(-1);
	const [startY, setStartY] = useState(0);
	const [offsetY, setOffsetY] = useState(0);
	const [isSelectedAll, setSelectedAll] = useState(false);
	const [deleteActive, setDeleteActive] = useState(false);
	const [selectedList, setSelectedList] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const codes = await getAllFundCodes(user.uid);
			const data = await getFundRealTimeData(
				codes.sort((a, b) => b["sort"] - a["sort"]).map(({ code }) => code)
			);
			const combineData = codes.map((c) => {
				const { code } = c;
				const val = data.find((v) => v.code === code);
				return { ...c, ...val, selected: false };
			});
			setSortData(combineData);
		};

    active && fetchData();

    setSelectedAll(false)
	}, [active]);

	const closeSortHandler = () => setSortState(false);

	const mouseDownHandler = ({ clientY }, idx) => {
		setDragIndex(idx);
		setDragState(true);
		setStartY(clientY);
	};
	const mouseUpHandler = () => {
		setDragIndex(-1);
		setDragState(false);
		setStartY(0);
	};
	const mouseMoveHandler = ({ clientY }) => {
		const itemHeight = 55;
		let offset = clientY - startY;

		if (offset > itemHeight && dragIndex < sortData.length - 1) {
			const nextIdx = dragIndex + 1;
			offset -= itemHeight;

			moveComputed(nextIdx);
			setStartY(startY + itemHeight);
			setDragIndex(nextIdx);
		} else if (offset < -itemHeight && dragIndex > 0) {
			const nextIdx = dragIndex - 1;
			offset += itemHeight;

			moveComputed(nextIdx);
			setStartY(startY - itemHeight);
			setDragIndex(nextIdx);
		}

		setOffsetY(offset);
	};

	// 通过方向计算位置
	const moveComputed = (idx) => {
		let list = sortData.slice(0);
		const currentItem = list.splice(dragIndex, 1)[0];

		list.splice(idx, 0, currentItem);

		setSortData(list);
	};

	// 置顶操作
	const setFundTop = (idx) => {
		let list = sortData.slice(0);
		const currentItem = list.splice(idx, 1)[0];

		list.splice(0, 0, currentItem);

		setSortData(list);
	};

	// 选中基金
	const selectEvent = (idx) => {
		const activeState = sortData[idx].selected;
		const list = sortData.slice(0);
		list[idx].selected = !activeState;

		setSelectedList(list.filter(({ selected }) => selected));
		setSortData(list);
	};

	// 全选
	const selectedAll = () => {
		const list = sortData.map((v) => ({ ...v, selected: !isSelectedAll }));
		setSelectedList(list.filter(({ selected }) => selected));
		setSelectedAll(!isSelectedAll);
		setSortData(list);
	};

	// 激活删除面板
	const openDeleteHandler = () => {
		selectedList.length && setDeleteActive(true);
	};
	const closaDeleteHandler = () => setDeleteActive(false);

	// 完成排序
	const confirmSortHandler = async () => {
		const params = {
			uid: user.uid,
			code: sortData
				.slice(0)
				.reverse()
				.map(({ id }, idx) => ({ id, sort: idx })),
		};

		await updateFundSort(params);

		closeSortHandler();
	};

	const renderItemJSX = () =>
		sortData.map((d, i) => (
			<Item
				data={d}
				key={d.id}
				styled={
					i === dragIndex
						? {
								transform: `translate(0, ${offsetY}px)`,
								opacity: 0.5,
								backgroundColor: "var(--sort-item-drag-bg)",
						  }
						: {}
				}
				setTopEvent={() => setFundTop(i)}
				mouseDownEvent={(e) => mouseDownHandler(e, i)}
				selectEvent={() => selectEvent(i)}
			></Item>
		));

	return (
		<Wrapper className={active && "active"}>
			<Head onClick={closeSortHandler}>
				<i className="iconfont chicken-arrow-left"></i>
				基金操作
			</Head>
			<Content ref={contentEl}>
				{renderItemJSX()}
				{isDrag && <Mask onMouseMove={mouseMoveHandler} onMouseUp={mouseUpHandler}></Mask>}
			</Content>
			<Footer>
				<SelectBox onClick={selectedAll}>
					<SelectIcon className={isSelectedAll && "active"}>
						<i className="iconfont chicken-xuanzhong"></i>
					</SelectIcon>
					全选
				</SelectBox>
				<BtnGroup>
					<button className={`red ${!selectedList.length && "active"}`} onClick={openDeleteHandler}>
						删除
					</button>
					<button onClick={confirmSortHandler}>完成</button>
				</BtnGroup>
			</Footer>
			<DeletePanel
				user={user}
				active={deleteActive}
				list={selectedList}
				closeEvent={closaDeleteHandler}
			></DeletePanel>
		</Wrapper>
	);
};

export default SortPage;
