/*
 * @Date: 2020-07-22 14:22:32
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-28 10:15:30
 * @Description: my footer
 */

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMarketState, setMarketStateText, changeSearchState, setMenuState } from "../../redux/actions";
import { Wrapper, StateBox, Toolbar, IncomeBox } from "./index.style";
import { checkFundOpen, requestRecursion, isMarketOpen } from "../../../../utils";
import { getLocal, setLocal } from "../../services/localStorage";
import Constants from "../../../../constants";
import Menu from '../menu'

const FooterBox = () => {
	const theme = useSelector((state) => state.theme);
	const totalIncome = useSelector((state) => state.totalIncome);
	const totalCrease = useSelector((state) => state.totalCrease);
	const isMenuOpen = useSelector(state => state.isMenuOpen)
	const userConfig = getLocal(Constants.LOCAL_CONFIG);
	const [isHide, setHide] = useState(userConfig && userConfig.hide);
	const [income, setIncome] = useState(0);
	const [statusText, setOpen] = useState("");
	const [menuOpen, setMenuOpen] = useState(false)	//	菜单开关
	const [todayCrease, setTodayCrease] = useState("");
	const dispatch = useDispatch();
	const intervalCheck = () => false;

	useEffect(() => {
		requestRecursion({
			fns: [checkFundOpen, isMarketOpen],
			check: intervalCheck,
			time: 1000,
			callback: ([text, state]) => {
				dispatch(setMarketState(state)); //	状态文本
				dispatch(setMarketStateText(text));
				setOpen(text);
			},
		});
	}, []);

	useEffect(() => {
		const total = totalIncome > 0 ? `+${totalIncome}` : totalIncome;
		const crease = totalCrease > 0 ? `+${totalCrease}%` : `${totalCrease}%`;
		setIncome(total);
		setTodayCrease(crease);
	}, [totalIncome]);

	const hideClickHandler = () => {
		setHide(!isHide);
		setLocal(Constants.LOCAL_CONFIG, { hide: !isHide });
	};

	const openSearch = () => {
		dispatch(changeSearchState(true));
	}

	const toggleMenu = () => {
		if (!menuOpen) {
			dispatch(setMenuState(true));
			setMenuOpen(true)
		} else {
			closeMenu()
		}
	}

	const closeMenu = () => {
		dispatch(setMenuState(false));
		setTimeout(() => {
			setMenuOpen(false);
		}, 200);
	};

	return (
		<Wrapper theme={theme}>
			<StateBox theme={theme} isOpen={statusText === Constants.MARKET_OPEN}>
				{statusText}
			</StateBox>
			<IncomeBox theme={theme} onClick={hideClickHandler}>
				预估收益：
				<span className={income < 0 && "bad"}>
					{isHide ? "点击显示" : `${income} ${todayCrease}`}
				</span>
			</IncomeBox>
			<Toolbar>
				<span className="iconfont chicken-search-fill" onClick={openSearch}></span>
				<span className="iconfont chicken-more" onClick={toggleMenu}></span>
			</Toolbar>
			{/* 菜单 */}
			{ menuOpen && <Menu theme={theme} active={isMenuOpen} closeEvent={closeMenu} /> }
		</Wrapper>
	);
};

export default FooterBox;
