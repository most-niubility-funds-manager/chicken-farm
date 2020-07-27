/*
 * @Date: 2020-07-22 14:22:32
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-07-25 00:01:45
 * @Description: my footer
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SET_MARKET_STATE, SET_MARKET_STATE_TEXT } from '../../redux/actionTypes'
import Constants from '../../../../constants'
import { Wrapper, StateBox } from "./index.style";
import { checkFundOpen, requestRecursion, isMarketOpen } from "../../../../utils";

const FooterBox = () => {
	const theme = useSelector(state => state.theme);
	const [statusText, setOpen] = useState('');
	const dispatch = useDispatch()
	const intervalCheck = () => false

	useEffect(() => {
		requestRecursion([checkFundOpen, isMarketOpen], intervalCheck, 1000, ([ text, state ]) => {
			dispatch({ type: SET_MARKET_STATE_TEXT, text })	//	状态文本
			dispatch({ type: SET_MARKET_STATE, state })
			setOpen(text)
		})
	}, '')

	return (
		<Wrapper theme={theme}>
			<StateBox theme={theme} isOpen={statusText === Constants.MARKET_OPEN}>
        {statusText}
			</StateBox>
		</Wrapper>
	);
};

export default FooterBox;
