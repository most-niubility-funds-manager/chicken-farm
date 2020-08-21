import React, { useState, useEffect } from "react";
import { Wrapper } from "./index.style";
import { useDispatch, useSelector } from 'react-redux'
import { setSortKey } from '../../../redux/actions'
import { setLocal } from '../../../services/localStorage'
import Constants from '../../../../../constants'

const SortIcon = (props) => {
  const { theme, dataKey } = props;
  const sortKey = useSelector(state => state.sortKey)
  const [sortState, setSortState] = useState(0);
  const dispatch = useDispatch()

  useEffect(() => {
    const [key, type] = sortKey.split('_')
    if (key !== dataKey) {
      setSortState(0)
    } else {
      setSortState(type * 1)
    }
  }, [sortKey])

	const clickHandler = () => {
    const idx = sortState + 1 > 2 ? 0 : sortState + 1;
    
    setSortState(idx);
    dispatch(setSortKey(`${dataKey}_${idx}`))
    setLocal(Constants.LOCAL_CONFIG, { sort: `${dataKey}_${idx}` }) //  本地用户配置
	};

	return (
		<Wrapper
			theme={theme}
			className={sortState === 0 ? "" : sortState === 1 ? "ascending" : "descending"}
			onClick={clickHandler}
		></Wrapper>
	);
};

export default SortIcon;
