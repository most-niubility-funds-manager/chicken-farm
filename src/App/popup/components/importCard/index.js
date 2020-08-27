import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Wrapper, Mask, Content, Title, Input, Error, Succ } from "./index.style";
import { addAllFunds, convertCodeFetch, updateSingleFund } from "../../services";

const ImportCard = (props) => {
	const { active, closeEvent } = props;
	const inputEl = useRef(null);
	const [isError, setError] = useState(false);
	const [isLoading, setLoading] = useState(false);
	const [isSucc, setSucc] = useState(false);

	useEffect(() => {
		inputEl.current.focus();
	}, [inputEl]);

	const keydownHandler = (e) => {
		const { keyCode } = e;
		if (keyCode === 13) {
			submitHandler();
			e.preventDefault();
		}
	};

	const submitHandler = async () => {
		const { value } = inputEl.current;
		const reg = /#(.*)#/g;
		const str = reg.exec(value);

		if (!str) {
			setError(true);
			return;
		}

		try {
			const funds = JSON.parse(str[1]);
			const { succ } = await convertCodeFetch(funds.map(({ code }) => code));
			const fundData = succ.map(({ code, name }) => {
				const { unit } = funds.find(({ code: c }) => code === c);
				return {
					code,
					unit,
					name,
					state: 1,
					create: Date.now(),
				};
			});

			setLoading(true);
			// 若有新增基金，加入表同时改变了份额；再逐个更新一遍数据
			addAllFunds(fundData)
				.then((_) =>
					Promise.all(
						fundData.map(({ unit, code }) => updateSingleFund({ unit }, { k: "code", v: code }))
					)
				)
				.then((_) => {
					setLoading(false);
					setSucc(true);
				});
		} catch (error) {
			setError(true);
		}
	};

	return (
		<Wrapper>
			<Mask className={!active && "cancel"} onClick={closeEvent}></Mask>
			<Content className={!active && "cancel"}>
				<Title>导入数据</Title>
				<Input type="text" ref={inputEl} onKeyDown={keydownHandler} />
				{isError && <Error></Error>}
				{isSucc && <Succ></Succ>}
			</Content>
		</Wrapper>
	);
};

export default ImportCard;
