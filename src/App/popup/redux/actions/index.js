import {
	CHANGE_THEME,
	SET_MARKET_STATE,
	SET_MARKET_STATE_TEXT,
	SET_ACTIVE_TR,
} from "../actionTypes";

const changeTheme = (theme) => ({
	type: CHANGE_THEME,
	theme,
});

const setMarketState = (state) => ({
	type: SET_MARKET_STATE,
	state,
});

const setMarketStateText = (text) => ({
	type: SET_MARKET_STATE_TEXT,
	text,
});

const setActiveTr = (index) => ({
	type: SET_ACTIVE_TR,
	index,
});

export { changeTheme, setMarketState, setMarketStateText };
