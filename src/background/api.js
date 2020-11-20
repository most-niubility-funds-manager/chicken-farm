import { API_HOST } from "@/constants";

//  用户相关
export const LOGIN = `${API_HOST}/login`;
export const REGISTER = `${API_HOST}/register`;
export const CHECKID = `${API_HOST}/checkid`;
export const CHECKNAME = `${API_HOST}/checkname`;

// 天天
// 基金日涨幅
export const FUNDHISTORY = `https://danjuanapp.com/djapi/fund/nav/history/`; //  /code ?page 1 size 5  基金日涨幅
export const FUNDBASE = `https://push2.eastmoney.com/api/qt/ulist.np/get`; //  ?fltt=2&fields=1,2,3&secids=&_=
export const DERIVED = `https://danjuanapp.com/djapi/fund/derived/`; //  /code 获取上个交易日时间
export const FUNDSEARCH = `https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx`; //  ?m=1&key= &_=
export const FUNDLIVE = `https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo`; //  ? pageIndex=1 pageSize=50 plat=Android appType=ttjj product=EFund  Version=1 deviceid=1  Fcodes=a,b,c
export const FUNDMAIN = (code) => `http://fund.eastmoney.com/${code}.html?spm=search`;
export const FUNDSTOCK = (code) =>
	`http://fundf10.eastmoney.com/FundArchivesDatas.aspx?type=jjcc&code=${code}&topline=10&year=&month=&rt=${Math.random()}`;
export const STOCKSEARCH = (code) => `http://so.eastmoney.com/web/s?keyword=${code}`; //	股票查询
export const FUNDTREND = (code) => `https://danjuanapp.com/djapi/fund/nav-growth/${code}`; //	蛋卷一年的走势 day
export const FUNDVALUATION = (code) => `https://danjuanapp.com/djapi/fund/estimate-nav/${code}`; //	蛋卷实时净值

// 百度节假日
export const HOLIDAY = `https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php`; //  query=2020&resource_id=6018

//  基金操作相关
export const ALLFUNDS = `${API_HOST}/fund/all`;
export const ADDFUND = `${API_HOST}/fund/add`;
export const UPDATEFOLLOW = `${API_HOST}/fund/follow`;
export const UPDATEHOLD = `${API_HOST}/fund/hold`;
export const ADDBATCHFUNDS = `${API_HOST}/fund/batch/add`;
export const OLDBATCHADDFUNDS = `${API_HOST}/fund/batch/add/old`;
export const DELETEFUND = `${API_HOST}/fund/batch/delete`;
export const SORTFUND = `${API_HOST}/fund/sort`;
