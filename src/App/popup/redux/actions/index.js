import {
	CHANGE_THEME,
	SET_MARKET_STATE,
	SET_MARKET_STATE_TEXT,
	SET_ACTIVE_TR,
	CHANGE_SEARCH_STATE,
	SET_SEARCH_LOADING,
	SET_SEARCH_RESULT,
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

const changeSearchState = (state) => ({
	type: CHANGE_SEARCH_STATE,
	state,
});

const setSearchLoading = (state) => ({
	type: SET_SEARCH_LOADING,
	state,
});

const setSearchResult = (data) => ({
	type: SET_SEARCH_RESULT,
	data,
});

export {
	changeTheme,
	setMarketState,
	setMarketStateText,
	changeSearchState,
	setSearchLoading,
	setSearchResult,
};
