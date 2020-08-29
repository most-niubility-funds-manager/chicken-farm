import React from "react";
import { Wrapper } from "./index.style";

const Alert = (props) => {
	const { theme, isError } = props;

	if (!isError) {
		return <Wrapper theme={theme}>注:只能导入由插件导出的数据</Wrapper>;
	} else if (isError === 1) {
		return (
			<Wrapper theme={theme} className="succ">
				导入成功
			</Wrapper>
		);
	} else if (isError === 2) {
		return (
			<Wrapper theme={theme} className="error">
				导入数据格式错误
			</Wrapper>
		);
	} else {
		return <Wrapper theme={theme}>数据加载中...</Wrapper>;
	}
};

export default Alert;
