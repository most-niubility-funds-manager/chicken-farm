/*
 * @Date: 2020-07-22 14:22:32
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-10 16:07:12
 * @Description: my footer
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMarketState, setMarketStateText } from "../../redux/actions";
import Constants from "../../../../constants";
import { Wrapper, StateBox, NewsBox, Toolbar } from "./index.style";
import { checkFundOpen, requestRecursion, isMarketOpen, shuffleData } from "../../../../utils";
import { fetchNewsInfo } from "../../services";
import ExtConfig from "../../../../config.json";

const FooterBox = () => {
	const theme = useSelector((state) => state.theme);
	const [statusText, setOpen] = useState("");
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
			.then((news) => poll(news));
	}, []);

	const poll = (newsList, i = 0) => {
		let idx = i !== newsList.length - 1 ? i : 0
		idx++

		setCurrNew(Object.assign({}, newsList[idx]));
		setTimeout(() => {
			poll(newsList, idx)
		}, 5000)
	}

	return (
		<Wrapper theme={theme}>
			<StateBox theme={theme} isOpen={statusText === Constants.MARKET_OPEN}>
				{statusText}
			</StateBox>
			<NewsBox target="_blank" href={currNews.url} theme={theme} title={currNews.title}>
				{currNews.title}
			</NewsBox>
			<Toolbar>
				<a>
					{ExtConfig.name}-{ExtConfig.version}
				</a>
			</Toolbar>
		</Wrapper>
	);
};

export default FooterBox;
