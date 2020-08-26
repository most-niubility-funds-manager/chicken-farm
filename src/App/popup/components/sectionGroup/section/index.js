import React, { useState } from "react";
import { Section, Name, Number, Detail } from "./index.style";

const SectionItem = (props) => {
	const {
		data: { theme, name, total, count, percent },
		clickEvent,
		type,
	} = props;
	const isRise = count > 0;
	const countData = isRise ? `+${count}` : count;
	const percentData = isRise ? `+${percent}%` : `${percent}%`;
	const sectionData = [total, countData, percentData];

	const openMarket = () => {
		window.open("http://q.10jqka.com.cn/");
	};

	return (
		<Section theme={theme}>
			<Name theme={theme} onClick={openMarket}>
				{name.substr(0, 2)}
			</Name>
			<Number onClick={clickEvent}>{sectionData[type]}</Number>
		</Section>
	);
};

export default SectionItem;
