import { sendMessage } from "@lib/chrome";

// 请求创建ID
export const createUid = () => sendMessage({ command: "createUid" });
// 检测昵称是否重复
export const checkName = ({ uid, name }) =>
	sendMessage({ command: "checkName", data: { uid, name } });
// 注册
export const register = ({ uid, name, password }) =>
	sendMessage({ command: "register", data: { uid, name, password } });
// 登录
export const login = ({ name, password }) =>
	sendMessage({ command: "login", data: { name, password } });
// 退出账号/切换账号
export const loginOut = () => sendMessage({ command: "clearUser" });
//	获取账号信息
export const getUserInfo = () => sendMessage({ command: "getUser" });
// 强制跳转登录页
export const forceLogin = () => sendMessage({ command: "forceLogin" });