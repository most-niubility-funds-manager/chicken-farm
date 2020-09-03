import React from "react";
import { useSelector } from 'react-redux'
import { Section, Name, Number, Detail } from "./index.style";

const SectionItem = (props) => {
	const {
		theme,
		data: { name, total, count, percent },
		clickEvent,
		type,
	} = props;
	const isRise = count > 0;
	const countData = isRise ? `+${count}` : count;
	const percentData = isRise ? `+${percent}%` : `${percent}%`;
	const sectionData = [total, countData, percentData];
	const isWideScreen = useSelector(state => state.isWideScreen)

	
	const openMarket = () => {
		window.open("http://q.10jqka.com.cn/");
	};

	return (
		<Section theme={theme} className={isWideScreen && 'wideScreen'}>
			<Name theme={theme} onClick={openMarket}>
				{name.substr(0, 2)}
			</Name>
			<Number onClick={clickEvent} theme={theme} className={!isRise && "bad"}>
				{sectionData[type]}
			</Number>
			{
				isWideScreen && (
					<Detail theme={theme} className={!isRise && "bad"}>
						<span>{countData}</span>
						<span>{percentData}</span>
					</Detail>
				)
			}
		</Section>
	);
};

export default SectionItem;
