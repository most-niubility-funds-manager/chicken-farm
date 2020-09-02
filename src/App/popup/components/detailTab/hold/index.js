import React from "react";
import { Wrapper, Header, BodyItem, Cell } from "./index.styled";

const Hold = (props) => {
	const { theme, data } = props;

	return (
		<Wrapper>
			<Header theme={theme}>
				{data.head.map((v) => (
					<Cell theme={theme}>{v}</Cell>
				))}
			</Header>
			{data.body.map((v) => (
				<BodyItem theme={theme}>
					<Cell theme={theme} color={theme.cellColor}>{v[0]}</Cell>
					<Cell theme={theme}>{v[1]}</Cell>
					<Cell theme={theme} className={ v[4].type ? 'increase' : 'decrease' }>{v[2] === '0%' ? '暂无数据' : v[2] }</Cell>
					<Cell theme={theme} className={ v[4].type ? 'increase' : 'decrease' }>{v[3] === 0 ? '暂无数据' : v[3]}</Cell>
				</BodyItem>
			))}
		</Wrapper>
	);
};

export default Hold;
