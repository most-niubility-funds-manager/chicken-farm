import {
	CHANGE_THEME,
	SET_MARKET_STATE,
	SET_MARKET_STATE_TEXT,
	SET_ACTIVE_TR,
	CHANGE_SEARCH_STATE,
	SET_SEARCH_LOADING,
	SET_SEARCH_RESULT,
	UPDATE_FORCE,
	CHANGE_DELETE_STATE,
	SET_DELETE_CODE,
	SET_TOTAL_INCOME,
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

const setActiveTr = (code) => ({
	type: SET_ACTIVE_TR,
	code,
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

const updateForce = (state) => ({
	type: UPDATE_FORCE,
	state,
});

const changeDeleteState = (state) => ({
	type: CHANGE_DELETE_STATE,
	state,
});

const setDeleteCode = (code) => ({
	type: SET_DELETE_CODE,
	code,
});

const setTotalIncome = (total) => ({
	type: SET_TOTAL_INCOME,
	total,
});

export {
	changeTheme,
	setMarketState,
	setMarketStateText,
	changeSearchState,
	setSearchLoading,
	setSearchResult,
	updateForce,
	setActiveTr,
	changeDeleteState,
	setDeleteCode,
	setTotalIncome
};
