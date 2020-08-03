import React, { useState } from "react";
import { Wrapper, GridItem } from "./index.style";

const Tab = (props) => {
	const { theme, nav, clickEvent } = props;
	const [activeNav, setActiveNav] = useState(0);

	const clickHandler = (idx) => {
		setActiveNav(idx);
		clickEvent(nav[idx].key);
	};

	return (
		<Wrapper>
			{nav.map(({ name, key }, i) => (
				<GridItem
					theme={theme}
					key={key}
					className={activeNav === i && "active"}
					onClick={() => clickHandler(i)}
				>
					{name}
				</GridItem>
			))}
		</Wrapper>
	);
};

export default Tab;
