import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import throttle from "lodash.throttle";
import debounce from 'lodash.debounce'
import { Wrapper } from "./index.style";
import { setSortKey } from "../../../redux/actions";
import { setLocal } from "../../../services/localStorage";
import Constants from "../../../../../constants";

const SortIcon = (props) => {
	const { theme, dataKey } = props;
	const sortKey = useSelector((state) => state.sortKey);
	const [sortState, setSortState] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		const [key, type] = sortKey.split("_");
		if (key !== dataKey) {
			setSortState(0);
		} else {
			setSortState(type * 1);
		}
	}, [sortKey]);

	const clickHandler = debounce(
		() => {
			const idx = sortState + 1 > 2 ? 0 : sortState + 1;

			setSortState(idx);
			dispatch(setSortKey(`${dataKey}_${idx}`));
			setLocal(Constants.LOCAL_CONFIG, { sort: `${dataKey}_${idx}` }); //  本地用户配置
		},
		300,
	);

	return (
		<Wrapper
			theme={theme}
			className={sortState === 0 ? "" : sortState === 1 ? "ascending" : "descending"}
			onClick={clickHandler}
		>
			<span></span>
		</Wrapper>
	);
};

export default SortIcon;
