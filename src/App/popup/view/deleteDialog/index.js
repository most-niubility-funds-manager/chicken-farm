import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Wrapper, Mask, Content, CloseBtn, Title, Description, Group } from "./index.style";
import { getUserSingleFundData, deleteSingleFund } from "../../services";

const DelDialog = (props) => {
	const { closeEvent, active } = props;
	const theme = useSelector((state) => state.theme);
	const code = useSelector((state) => state.deleteCode);
	const [fundName, setFundName] = useState("");

	useEffect(() => {
		code &&
			getUserSingleFundData(code).then(({ name }) => {
				setFundName(name);
			});
	}, [code]);

	const deleteFund = () => {
		deleteSingleFund(code).then(() => closeEvent());
	};

	return (
		<Wrapper>
			<Mask onClick={closeEvent} className={!active && "cancel"}></Mask>
			<Content theme={theme} className={!active && "cancel"}>
				<CloseBtn className="iconfont chicken-close" theme={theme} onClick={closeEvent} />
				<Title theme={theme}>删除基金</Title>
				<Description theme={theme}>
					确定删除持有的{" "}
					<span>
						{fundName}-{code}
					</span>{" "}
					基金吗?
				</Description>
				<Group theme={theme}>
					<button className="cancel" onClick={closeEvent}>
						取消
					</button>
					<button onClick={deleteFund}>删除</button>
				</Group>
			</Content>
		</Wrapper>
	);
};

export default DelDialog;
