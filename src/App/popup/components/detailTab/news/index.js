import React from "react";
import { Wrapper, Item } from "./index.style";

const News = (props) => {
	const { theme, data } = props;

	return (
		<Wrapper>
			{data.map(({ url, title, type, time }, i) => (
				<Item href={url} target="_blank" key={i} theme={theme} title={title}>
					<p>{title}</p>
          <span>{type}</span>
					{time}
				</Item>
			))}
		</Wrapper>
	);
};

export default News;
