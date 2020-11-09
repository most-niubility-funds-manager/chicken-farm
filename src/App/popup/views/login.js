// 不登录就不能用a
import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import {
	createUid,
	checkName,
	register,
	login,
	setUserInfo,
	updateUserInfo,
	setLoginActive,
} from "../services";

const slideUp = keyframes`
  0% {
    transform: translate(-50%, 100%);
    opacity: 0;
	}
	10% {
		transform: translate(-50%, -45%);
		opacity: 0;
	}
  100% {
    transform: translate(-50%, -50%);
    opacity: 1;
  }
`;

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;
`;

const Mask = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(0px);
	transform: translateY(100%);
	transition: all 0.2s linear;
	will-change: backdrop-filter;

	&.active {
		backdrop-filter: blur(5px);
		transform: translateY(0);
	}
`;

const Content = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	width: 255px;
	height: 270px;
	border-radius: 6px;
	background-color: var(--login-bg);
	padding: 15px 20px 30px;
	opacity: 0;
	transform: translate(-50%, 100%);

	&.active {
		animation: ${slideUp} 0.18s linear 0.5s forwards;
	}
`;

const Head = styled.div`
	width: 100%;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 15px;

	.tab-group {
		display: flex;
		align-items: center;
		font-size: 16px;
		color: var(--login-tab);
		gap: 10px;

		span {
			transition: all 0.1s linear;
			cursor: pointer;

			&.active {
				color: var(--login-tab-active);
			}
		}
	}

	i {
		font-size: 24px;
		color: var(--login-icon);
		cursor: pointer;
	}
`;

const Body = styled.div`
	width: 100%;
	height: 180px;
	overflow: hidden;
`;

const FormList = styled.div`
	width: 200%;
	height: 100%;
	transition: all 0.15s linear;
	display: grid;
	grid-template-columns: repeat(2, 1fr);
	align-items: flex-start;

	&.active {
		transform: translateX(-50%);
	}

	& > div {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}
`;

const Label = styled.label`
	width: 100%;
	height: 40px;
	border-radius: 6px;
	background-color: var(--login-input-bg);
	color: var(--login-label);
	padding: 0 10px;
	font-size: 13px;
	margin-bottom: 16px;

	input {
		width: 150px;
		height: 100%;
		background-color: transparent;
		font-size: 13px;
		color: var(--login-input);
	}
`;

const Button = styled.button`
	width: 100%;
	height: 40px;
	color: var(--login-btn);
	background-color: var(--login-btn-bg);
	font-size: 13px;
	border-radius: 6px;
	margin-top: auto;
	cursor: pointer;
`;

const ErrorTip = styled.p`
	position: absolute;
	bottom: 55px;
	left: 0;
	width: 100%;
	text-align: center;
	font-size: 12px;
	color: var(--login-error);
`;

const LoginPage = (props) => {
	const { user, active } = props;
	const [isLogin, toggleLogin] = useState(true);
	const [newUid, setUid] = useState(null);
	const [isError, setError] = useState(false);
	const [errorText, setErrorText] = useState("");
	const loginNameEl = useRef(null);
	const loginPwdEl = useRef(null);
	const registerNameEl = useRef(null);
	const registerPwdEl = useRef(null);
	const spaceReg = /\s/g;
	const errorList = new Map([
		[0, "用户名或密码错误"],
		[1, "用户名不能包含空格"],
		[2, "请填写完整"],
		[3, "昵称已被注册"],
		[4, "注册失败"],
		[5, "登录失败"],
	]);

	const toggleLoginHandler = async (state) => {
		toggleLogin(state);
		if (!state) {
			loginNameEl.current.value = "";
			loginPwdEl.current.value = "";
			const { uid: id } = await createUid();
			setUid(id);
		} else {
			registerNameEl.current.value = "";
			registerPwdEl.current.value = "";
		}
	};

	const clearAllInput = () => {
		loginNameEl.current.value = "";
		loginPwdEl.current.value = "";
		registerNameEl.current.value = "";
		registerPwdEl.current.value = "";
	};

	const loginHandler = async () => {
		const name = loginNameEl.current.value;
		const password = loginPwdEl.current.value;

		if (!name.length || !password.length) {
			setError(true);
			setErrorText(errorList.get(2));
			return;
		}

		if (spaceReg.test(name)) {
			setError(true);
			setErrorText(errorList.get(1));
			return;
		}

		const { status = false, uid } = await login({ name, password });
		if (!status) {
			setError(true);
			setErrorText(errorList.get(0));
			return;
		}

		setUserInfo({ uid, name });
		setLoginActive(false);
		updateUserInfo();
		clearAllInput();
	};

	const registerHandler = async () => {
		const name = registerNameEl.current.value;
		const password = registerPwdEl.current.value;

		if (!name.length || !password.length) {
			setError(true);
			setErrorText(errorList.get(2));
			return;
		}

		if (spaceReg.test(name)) {
			setError(true);
			setErrorText(errorList.get(1));
			return;
		}

		const { status: isUsed } = await checkName({ uid: newUid, name });
		if (!isUsed) {
			setError(true);
			setErrorText(errorList.get(3));
			return;
		}

		const { status = false } = await register({ uid: newUid, name, password });
		if (!status) {
			setError(true);
			setErrorText(errorList.get(4));
			return;
		}

		// 更新本地数据 关闭弹窗
		setUserInfo({ uid: newUid, name });
		setLoginActive(false);
		updateUserInfo();
		clearAllInput();
	};

	const loginKeydownHandler = (e) => {
		const { keyCode } = e;
		keyCode === 13 && loginHandler();
	};
	const registerKeydownHandler = (e) => {
		const { keyCode } = e;
		keyCode === 13 && registerHandler();
	};

	return (
		<Wrapper>
			<Mask className={active && "active"}></Mask>
			<Content className={active && "active"}>
				<Head>
					<div className="tab-group">
						<span className={isLogin && "active"} onClick={() => toggleLoginHandler(true)}>
							登录
						</span>
						<span className={!isLogin && "active"} onClick={() => toggleLoginHandler(false)}>
							注册
						</span>
					</div>
				</Head>
				<Body>
					<FormList className={!isLogin && "active"}>
						<div>
							<Label>
								账号：
								<input type="text" ref={loginNameEl} maxLength="16" />
							</Label>
							<Label>
								密码：
								<input type="password" ref={loginPwdEl} onKeyDown={loginKeydownHandler} />
							</Label>
							<Button onClick={loginHandler}>登录</Button>
							{isError && <ErrorTip>{errorText}</ErrorTip>}
						</div>
						<div>
							<Label>
								账号：
								<input type="text" ref={registerNameEl} maxLength="16" />
							</Label>
							<Label>
								密码：
								<input type="password" ref={registerPwdEl} onKeyDown={registerKeydownHandler} />
							</Label>
							<Button onClick={registerHandler}>注册</Button>
							{isError && <ErrorTip>{errorText}</ErrorTip>}
						</div>
					</FormList>
				</Body>
			</Content>
		</Wrapper>
	);
};

export default LoginPage;
