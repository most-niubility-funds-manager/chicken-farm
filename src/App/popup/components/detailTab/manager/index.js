import React from "react";
import { Wrapper, Paragraph } from "./index.style";

const Manager = (props) => {
	const { theme, data } = props;

	return (
		<Wrapper>
			{data.map((v) => (
				<Paragraph theme={theme}>{v}</Paragraph>
			))}
		</Wrapper>
	);
};

export default Manager