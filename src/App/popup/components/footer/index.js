/*
 * @Date: 2020-07-22 14:22:32
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-05 16:47:45
 * @Description: my footer
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMarketState, setMarketStateText } from '../../redux/actions'
import Constants from "../../../../constants";
import { Wrapper, StateBox, NewsBox, Toolbar } from "./index.style";
import { checkFundOpen, requestRecursion, isMarketOpen, shuffleData } from "../../../../utils";
import { fetchNewsInfo } from "../../services";

const FooterBox = () => {
	const theme = useSelector((state) => state.theme);
	const [statusText, setOpen] = useState("");
	const [newsList, setNewsList] = useState([]);
	const [activeIdx, setActiveIdx] = useState(0);
	const [currNews, setCurrNew] = useState({});
	const dispatch = useDispatch();
	const intervalCheck = () => false;

	useEffect(() => {
		requestRecursion([checkFundOpen, isMarketOpen], intervalCheck, 1000, ([text, state]) => {
			dispatch(setMarketState(state)); //	状态文本
			dispatch(setMarketStateText(text));
			setOpen(text);
		});

		fetchNewsInfo()
			.then((news) => shuffleData(news))
			.then((news) => setNewsList(news));
	}, []);

	useEffect(() => {
		let idx = 0;
		if (activeIdx !== newsList.length - 1) {
			idx = activeIdx + 1;
		}
		setTimeout(() => {
			setActiveIdx(idx);
			setCurrNew(Object.assign({}, newsList[idx]));
		}, 5000);
	}, [newsList, activeIdx]);

	return (
		<Wrapper theme={theme}>
			<StateBox theme={theme} isOpen={statusText === Constants.MARKET_OPEN}>
				{statusText}
			</StateBox>
			<NewsBox target="_blank" href={currNews.url} theme={theme} title={currNews.title}>
				{currNews.title}
			</NewsBox>
			<Toolbar>
				<a onClick={() => chrome.tabs.create({url: location.href})}>popup</a>
			</Toolbar>
		</Wrapper>
	);
};

export default FooterBox;
