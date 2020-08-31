import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Wrapper, Mask, Content, Title, Input, Btn, Footer, BtnGroup } from "./index.style";
import {
	convertCodeFetch,
	updateFundByImport,
	syncFundsActively,
} from "../../services";
import Alert from "./alert";

const ImportCard = (props) => {
	const { active, closeEvent } = props;
	const theme = useSelector((state) => state.theme);
	const inputEl = useRef(null);
	const [dataState, setDataState] = useState(0); //	0 无状态 1 成功 2 失败 3 loading

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
			setDataState(2);
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

			setDataState(3);
			// 若有新增基金，加入表同时改变了份额；再逐个更新一遍数据
			updateFundByImport(fundData)
				.then((_) => syncFundsActively())
				.then((_) => {
					setDataState(1);
					closeEvent();
				});
		} catch (error) {
			setDataState(2);
		}
	};

	return (
		<Wrapper>
			<Mask className={!active && "cancel"} onClick={closeEvent}></Mask>
			<Content className={!active && "cancel"} theme={theme}>
				<Title theme={theme}>导入数据</Title>
				<Input type="text" ref={inputEl} onKeyDown={keydownHandler} theme={theme} />
				<Footer>
					<Alert theme={theme} isError={dataState} />
					<BtnGroup>
						<Btn theme={theme} onClick={closeEvent}>
							取消
						</Btn>
						<Btn theme={theme} className="primary" onClick={submitHandler}>
							确定
						</Btn>
					</BtnGroup>
				</Footer>
			</Content>
		</Wrapper>
	);
};

export default ImportCard;
