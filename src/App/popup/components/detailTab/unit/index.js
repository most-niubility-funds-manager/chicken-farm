import React from "react";
import { Wrapper, Box, BoxBg, BoxContent } from "./index.style";

const Unit = (props) => {
	const { theme, data } = props;

	return (
		<Wrapper>
			{data.body.map(([date, crease, { value, type }]) => (
				<Box key={date} theme={theme}>
					<BoxBg width={value} type={type} theme={theme} />
					<BoxContent theme={theme}>
						<span>{date}</span>
						<span>{crease}</span>
					</BoxContent>
				</Box>
			))}
		</Wrapper>
	);
};

export default Unit