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
	SET_TOTAL_INCOME
} from "../actionTypes";
import { requestGet } from "../../services/request";

// 默认全部状态
const defaultState = {
	theme: {}, //  内部主题色
	isMarketOpen: false, //  今日现在是否已休市
	marketState: "", //  开盘中 午间休市 已休市
	activeFundCode: 0, //  点击的基金code
	isSearch: false, //	搜索结果页
	isSearchLoading: false, //	搜索结果loading
	searchData: {
		succ: [],
		fail: [],
	}, //	搜索结果
	isSearchUpdate: false, //	搜索完更新列表数据
	isDelete: false, //	删除面板
	deleteCode: 0, //	删除基金code
	totalIncome: 0,	//	当日总收益
};

export default (state = defaultState, action) => {
	// console.log('reducer', state, action)

	switch (action.type) {
		case CHANGE_THEME:
			return Object.assign({}, state, { theme: action.theme });
		case SET_MARKET_STATE:
			state.isMarketOpen = action.state;
			return state;
		case SET_MARKET_STATE_TEXT:
			state.text = action.text;
			return state;
		case SET_ACTIVE_TR:
			state.activeFundCode = action.code;
			return state;
		case CHANGE_SEARCH_STATE:
			state.isSearch = action.state;
			return state;
		case SET_SEARCH_LOADING:
			state.isSearchLoading = action.state;
			return state;
		case SET_SEARCH_RESULT:
			return Object.assign({}, state, { searchData: action.data });
		case UPDATE_FORCE:
			state.isSearchUpdate = action.state;
			return state;
		case CHANGE_DELETE_STATE:
			state.isDelete = action.state;
			return state;
		case SET_DELETE_CODE:
			state.deleteCode = action.code;
			return state;
		case SET_TOTAL_INCOME:
			state.totalIncome = action.total
			return state
		default:
			return state;
	}
};
