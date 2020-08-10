import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Wrapper, Tag } from "./index.style";
import { getLocal, setLocal } from '../../../services/localStorage'
import Constants from '../../../../../constants'

const Income = (props) => {
	const { theme } = props;
	const config = getLocal(Constants.LOCAL_CONFIG)
	const [isHide, setHide] = useState(config && config.hide);
	const [income, setIncome] = useState(0);
	const totalIncome = useSelector((state) => state.totalIncome);

	useEffect(() => {
		const total = totalIncome > 0 ? `+${totalIncome}` : totalIncome;
		setIncome(total);
	}, [totalIncome]);

	const hideClickHandler = () => {
		setHide(!isHide);
		setLocal(Constants.LOCAL_CONFIG, { hide: !isHide })
	};

	return (
		<Wrapper theme={theme} onClick={hideClickHandler}>
			预估收益:
			<Tag theme={theme} className={income < 0 && "bad"}>
				{isHide ? '点击显示' : income}
			</Tag>
		</Wrapper>
	);
};

export default Income;
