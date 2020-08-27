import {
	CHANGE_THEME,
	SET_MARKET_STATE,
	SET_MARKET_STATE_TEXT,
	SET_ACTIVE_TR,
	CHANGE_SEARCH_STATE,
	SET_SEARCH_LOADING,
	SET_SEARCH_RESULT,
	UPDATE_FORCE,
	SET_TOTAL_INCOME,
	SET_TOTAL_CREASE,
	SET_SORT_KEY,
	SET_MENU_STATE,
	SET_IMPORT_STATE,
	TOGGLE_WIDESCREEN,
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

const setTotalIncome = (total) => ({
	type: SET_TOTAL_INCOME,
	total,
});

const setTotalCrease = (crease) => ({
	type: SET_TOTAL_CREASE,
	crease,
});

const setSortKey = (key) => ({
	type: SET_SORT_KEY,
	key,
});

const setMenuState = (state) => ({
	type: SET_MENU_STATE,
	state
})

const setImportState = (state) => ({
	type: SET_IMPORT_STATE,
	state
})

const toggleWideScreen = (state) => ({
	type: TOGGLE_WIDESCREEN,
	state
})

export {
	changeTheme,
	setMarketState,
	setMarketStateText,
	changeSearchState,
	setSearchLoading,
	setSearchResult,
	updateForce,
	setActiveTr,
	setTotalIncome,
	setTotalCrease,
	setSortKey,
	setImportState,
	setMenuState,
	toggleWideScreen
};
