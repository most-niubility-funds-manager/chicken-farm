import React, { useState, useEffect } from "react";
import { getUserInfo, forceLogin } from "../service/user";

const LoginStatus = (update) => {
	const [userInfo, setUserInfo] = useState(null);

	useEffect(() => {
		getUser();
	}, [update]);

	const getUser = async () => {
		// 获取本地用户信息
		const info = await getUserInfo();
		if (!info) {
			forceLogin();
		} else {
			setUserInfo(info);
		}
	};

	return userInfo || null;
};

export default LoginStatus;
