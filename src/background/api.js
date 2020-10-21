import { API_HOST } from "@/constants";

//  用户相关
export const LOGIN = `${API_HOST}/login`;
export const REGISTER = `${API_HOST}/register`;
export const CHECKID = `${API_HOST}/checkid`;
export const CHECKNAME = `${API_HOST}/checkname`;

// 蛋卷
// 基金日涨幅
export const FUNDHISTORY = `https://danjuanapp.com/djapi/fund/nav/history/`; //  /code ?page 1 size 5  基金日涨幅
export const FUNDBASE = `https://push2.eastmoney.com/api/qt/ulist.np/get`; //  ?fltt=2&fields=1,2,3&secids=&_=
export const DERIVED = `https://danjuanapp.com/djapi/fund/derived/`; //  /code 获取上个交易日时间
export const FUNDSEARCH = `https://fundsuggest.eastmoney.com/FundSearch/api/FundSearchAPI.ashx`; //  ?m=1&key= &_=
export const FUNDLIVE = `https://fundmobapi.eastmoney.com/FundMNewApi/FundMNFInfo`; //  ? pageIndex=1 pageSize=50 plat=Android appType=ttjj product=EFund  Version=1 deviceid=1  Fcodes=a,b,c

// 百度节假日
export const HOLIDAY = `https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php`; //  query=2020&resource_id=6018

//  基金操作相关
export const ALLFUNDS = `${API_HOST}/fund/all`;
export const ADDFUND = `${API_HOST}/fund/add`;
export const UPDATEFOLLOW = `${API_HOST}/fund/follow`;
export const UPDATEHOLD = `${API_HOST}/fund/hold`;
