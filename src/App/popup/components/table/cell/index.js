import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMarketState } from "../../../redux/actions";
import { Td, Tag, Input, Btn } from "./index.style";

const Cell = (props) => {
	const {
		tag,
		field,
		theme,
		input,
		active,
		keyword,
		btn,
		rowIndex,
		textAlign,
		blurEvent,
		delEvent,
	} = props;
	const inputEl = useRef(null);
	const dispatch = useDispatch();
	const [unitValue, setUnitValue] = useState(null);

	// 更新单元格数据
	useEffect(() => {
		setUnitValue(field)
	}, [field])

	// focus时暂停数据更新
	const focusHandler = () => {
		dispatch(setMarketState(false));
	};

	const blurHandler = () => {
		blurEvent(rowIndex, inputEl.current.value);
		dispatch(setMarketState(true));
	};

	const changeHandler = (e) => {
		setUnitValue(inputEl.current.value);
	};

	const keyDownHandler = (e) => {
		const {keyCode} = e
		if (keyCode === 13) {
			inputEl.current.blur()
			e.preventDefault();
		}
	}

	const checkCrease = (str) => str.includes("-")

	if (tag) {
		return (
			<Td keyword={keyword} theme={theme} style={{ textAlign }}>
				<Tag className={checkCrease(field) ? "decrease" : "increase"} theme={theme} title={field}>
					{field}
				</Tag>
			</Td>
		);
	} else if (input) {
		return (
			<Td keyword={keyword} theme={theme} style={{ textAlign }}>
				<Input
					ref={inputEl}
					type="number"
					value={unitValue}
					theme={theme}
					onBlur={blurHandler}
					onFocus={focusHandler}
					onChange={changeHandler}
					onKeyDown={keyDownHandler}
					className={active && "hover"}
				/>
			</Td>
		);
	} else if (btn) {
		return (
			<Td keyword={keyword} theme={theme} style={{ textAlign }}>
				<Btn theme={theme} onClick={delEvent}>
					{btn}
				</Btn>
			</Td>
		);
	} else {
		return (
			<Td keyword={keyword} theme={theme} style={{ textAlign }}>
				{field}
			</Td>
		);
	}
};

export default Cell;
