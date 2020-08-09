import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Wrapper, Tag } from "./index.style";

const Income = (props) => {
	const { theme } = props;
	const [isHide, setHide] = useState(false);
	const [income, setIncome] = useState(0);
	const [fakeNum, setFakeNum] = useState("");
	const totalIncome = useSelector((state) => state.totalIncome);

	useEffect(() => {
		const total = totalIncome > 0 ? `+${totalIncome}` : totalIncome;
		setIncome(total);
	}, [totalIncome]);

	const hideClickHandler = () => {
		const length = income.toString().length;
		const fake = "$".repeat(length);
		setFakeNum(fake);
		setHide(!isHide);
	};

	return (
		<Wrapper theme={theme} onClick={hideClickHandler}>
			预估收益:
			<Tag theme={theme} className={income < 0 && "bad"}>
				{isHide ? fakeNum : income}
			</Tag>
		</Wrapper>
	);
};

export default Income;
