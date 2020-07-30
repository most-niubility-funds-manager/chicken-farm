/*
 * @Date: 2020-07-22 14:22:32
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-30 16:40:07
 * @Description: my footer
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_MARKET_STATE, SET_MARKET_STATE_TEXT } from "../../redux/actionTypes";
import Constants from "../../../../constants";
import { Wrapper, StateBox, NewsBox } from "./index.style";
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
			dispatch({ type: SET_MARKET_STATE_TEXT, text }); //	状态文本
			dispatch({ type: SET_MARKET_STATE, state });
			setOpen(text);
		});
	}, []);

	useEffect(() => {
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
			<NewsBox target="_blank" href={currNews.url} theme={theme}>{currNews.title}</NewsBox>
		</Wrapper>
	);
};

export default FooterBox;
