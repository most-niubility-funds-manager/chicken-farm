import React from "react";
import { Wrapper, Item } from "./index.style";

const News = (props) => {
	const { theme, data } = props;

	return (
		<Wrapper>
			{data.map(({ url, title, type, date }, i) => (
				<Item href={url} target="_blank" key={i} theme={theme}>
					<p>{title}</p>
          <span>{type}</span>
					{date}
				</Item>
			))}
		</Wrapper>
	);
};

export default News;
