import React, { useEffect } from "react";
import { Wrapper, Table, Tr, Th } from "./index.style";
import Cell from "../cell";

const SubTable = (props) => {
	const {
		head,
		position,
		data,
		theme,
		hoverEvent,
		leaveEvent,
		clickEvent,
		blurEvent,
		delEvent,
		activeIndex,
	} = props;
	const isFixClass = position ? position : "";

	let blankOffsetLeft = 0;
	let blankOffsetRight = 0;

	if (!isFixClass) {
		blankOffsetLeft = head.reduce(
			(sum, { width, position }) => (position === "left" ? sum + width : sum),
			0
		);
	}

	// 生成表的数据
	const headData = isFixClass ? head : head.filter(({ position }) => !position);
	const totalWidth = headData.reduce((sum, { width }) => sum + width, 0); //  计算总宽度
	const fieldData = headData.map(({ dataIndex, textAlign, tag, input, keyword }) => ({
		dataIndex,
		textAlign,
		tag,
		input,
		keyword,
	}));
	// 遍历出当前表所需数据 [{ active, list:[] }]
	const bodyData = data.map((item, idx) => {
		const resList = fieldData.reduce((arr, { dataIndex, textAlign, tag, input, keyword }) => {
			const tdConfig = {
				field: item[dataIndex],
				textAlign,
				tag,
				input,
				keyword,
			};
			arr.push(tdConfig);
			return arr;
		}, []);
		const resData = {
			list: resList,
			active: activeIndex !== null && idx === activeIndex, //  hover状态
		};

		return resData;
	});

	return (
		<Wrapper
			theme={theme}
			className={isFixClass}
			style={{ width: `${totalWidth + blankOffsetLeft + blankOffsetRight}px` }}
		>
			{/* {!!blankOffsetLeft && <div style={{ width: `${blankOffsetLeft}px` }}></div>} */}
			<Table style={{ width: `${totalWidth}px` }} theme={theme} className="rightBorder">
				<thead>
					<Tr theme={theme}>
						{headData.map(({ title, key, width, textAlign }) => (
							<Th theme={theme} key={key} style={{ width: `${width}px`, textAlign }}>
								{title}
							</Th>
						))}
					</Tr>
				</thead>
				<tbody>
					{bodyData.map(({ list, active }, i) => (
						<Tr
							key={i}
							theme={theme}
							className={active && "active"}
							onMouseEnter={() => hoverEvent(i)}
							onMouseLeave={leaveEvent}
							onClick={() => clickEvent(i)}
						>
							{list.map(({ field, textAlign, tag, input, keyword }, idx) => (
								<Cell
									tag={tag}
									input={input}
									theme={theme}
									field={field}
									active={active}
									key={idx}
									textAlign={textAlign}
									keyword={keyword}
									rowIndex={i}
									blurEvent={blurEvent}
									delEvent={() => delEvent(i)}
								/>
							))}
						</Tr>
					))}
				</tbody>
			</Table>
		</Wrapper>
	);
};

export default SubTable;
