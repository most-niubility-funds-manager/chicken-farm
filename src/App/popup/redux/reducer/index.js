import {
	CHANGE_THEME,
	SET_MARKET_STATE,
	SET_MARKET_STATE_TEXT,
	SET_ACTIVE_TR,
} from "../actionTypes";

// 默认全部状态
const defaultState = {
	theme: {}, //  内部主题色
	isMarketOpen: false, //  今日现在是否已休市
	marketState: "", //  开盘中 午间休市 已休市
	activeTrIndex: 0, //  当前hover状态的tr index
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
			state.activeTrIndex = action.index;
			return state;
		default:
			return state;
	}
};
