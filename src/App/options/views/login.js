import React, { useState, useRef } from "react";
import styled from "styled-components";
import { createUid, checkName, register, login } from "../service/user";
import { sendMessage } from "@lib/chrome";

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: var(--login-mask);
	}
`;

const Content = styled.div`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 400px;
	height: 400px;
	background-color: var(--login-bg);
	border-radius: 6px;
	overflow: hidden;
`;

const Form = styled.div.attrs({ className: "form" })`
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	padding: 20px 20px 30px;

	.tab {
		width: 100%;
		height: 40px;
		display: flex;
		align-items: center;
		font-size: 16px;
		color: var(--login-tab);
		margin-bottom: 15px;
		gap: 1em;

		span {
			cursor: pointer;
			&.active {
				color: var(--login-tab-active);
			}
		}
	}

	label {
		display: block;
		width: 100%;
		height: 36px;
		border-radius: 6px;
		border: 1px solid var(--login-border);
		padding: 0 16px;
		margin-bottom: 15px;
		background-color: var(--login-input-bg);

		input {
			width: 100%;
			height: 100%;
			background-color: transparent;
			font-size: 15px;
		}

		&.error {
			border: 1px solid var(--red);
		}
	}

	.help {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: auto;

		.error {
			font-size: 12px;
			color: var(--login-error);
			text-align: left;
			opacity: 0;

			&.active {
				opacity: 1;
			}
		}

		.helphelp {
			font-size: 12px;
			color: var(--login-help-font);
			cursor: pointer;
		}
	}

	button {
		width: 100%;
		height: 40px;
		border-radius: 6px;
		background-color: var(--login-btn);
		font-size: 16px;
		color: var(--login-btn-font);
		cursor: pointer;
	}
`;

const TipBox = styled.div`
	position: absolute;
	top: 0;
	left: 100%;
	width: 100%;
	height: 100%;
	padding: 20px;
	background-color: var(--login-bg);
	transition: all 0.2s linear;
	display: grid;
	grid-template-rows: 40px 1fr;

	&.active {
		transform: translateX(-100%);
	}

	.head {
		display: flex;
		align-items: center;
		font-size: 16px;
		color: var(--login-tab-active);
		cursor: pointer;

		i {
			font-size: 18px;
			margin-right: 6px;
		}
	}

	.body {
		height: 100%;
		overflow: auto;
		&::-webkit-scrollbar-thumb {
			background-color: transparent;
		}
	}
`;

const HelpItem = styled.div`
	width: 100%;
	margin-bottom: 10px;
	padding: 10px 0;

	.question {
		font-size: 16px;
		color: var(--login-help-question);
		margin-bottom: 6px;
	}
	.answer {
		font-size: 14px;
		color: var(--login-help-answer);
	}
`;

const LoginPage = () => {
	const [isLogin, setLogin] = useState(true);
	const [newUid, setNewUid] = useState("");
	const [isError, setError] = useState(false);
	const [errorText, setErrorText] = useState(0);
	const [isHelp, setHelp] = useState(false);
	const nameInput = useRef(null);
	const pwdInput = useRef(null);
	const spaceReg = /\s/g;
	const errorList = new Map([
		[0, "用户名或密码错误"],
		[1, "用户名不能包含空格"],
		[2, "请填写完整"],
		[3, "昵称已被注册"],
		[4, "注册失败"],
		[5, "登录失败"],
	]);
	const helpList = [
		{
			q: "为什么需要注册/登录",
			a: "使用账号系统能够更好的存储您的基金数据，多端登录不用麻烦的导入导出数据",
		},
		{ q: "注册上面的一串代号是什么", a: "这是为用户随机生成的一个ID，切换登录/注册会再次随机生成" },
		{ q: "每次都要登录吗", a: "一个设备只需登录一次，便可一直记录(如果不卸载插件的话)" },
		{ q: "怎么退出登录", a: "点击右上角退出登录会清除本地账号记录" },
	];

	// 切换登录注册
	const switchLogin = async (sign) => {
		if (isLogin && !sign) {
			const { uid } = await createUid();
			setNewUid(uid);
		}

		setLogin(sign);
		setError(false);
		nameInput.current.value = "";
		pwdInput.current.value = "";
	};

	// 打开帮助
	const switchHelp = (sign) => setHelp(sign);

	// 注册账号
	const signUp = async () => {
		const name = nameInput.current.value;
		const password = pwdInput.current.value;

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
    sendMessage({ command: "jumpIndex" }); //  回到首页
    sendMessage({ command: "setUser", data: { uid: newUid, name } })
	};

	// 登录账号
	const signIn = async () => {
		const name = nameInput.current.value;
		const password = pwdInput.current.value;
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

		const { status = false, uid = '' } = await login({ name, password });
		if (!status) {
			setError(true);
			setErrorText(errorList.get(0));
			return;
		}
    sendMessage({ command: "jumpIndex" }); //  回到首页
    sendMessage({ command: "setUser", data: { uid, name } })
	};

	const tipClass = `error ${isError && "active"}`;
	const tipBoxClass = isHelp && "active";

	return (
		<Wrapper>
			<div className="mask"></div>
			<Content>
				{isLogin && (
					<Form>
						<div className="tab">
							<span className="active" onClick={() => switchLogin(true)}>
								登录
							</span>
							<span onClick={() => switchLogin(false)}>快速注册</span>
						</div>
						<label>
							<input type="text" placeholder="输入用户名" ref={nameInput} />
						</label>
						<label>
							<input type="password" placeholder="输入密码" ref={pwdInput} />
						</label>
						<p className="help">
							<p className={tipClass}>{errorText}</p>
							<p className="helphelp" onClick={() => switchHelp(true)}>
								遇到问题?
							</p>
						</p>
						<button onClick={signIn}>登录</button>
					</Form>
				)}
				{!isLogin && (
					<Form>
						<div className="tab">
							<span onClick={() => switchLogin(true)}>登录</span>
							<span className="active" onClick={() => switchLogin(false)}>
								快速注册
							</span>
						</div>
						<label>
							<input
								type="text"
								placeholder="输入用户名, 最长16个字"
								ref={nameInput}
								maxLength="16"
							/>
						</label>
						<label>
							<input type="password" placeholder="输入密码" ref={pwdInput} />
						</label>
						<p className="help">
							<p className={tipClass}>{errorText}</p>
							<p className="helphelp" onClick={() => switchHelp(true)}>
								遇到问题?
							</p>
						</p>
						<button onClick={signUp}>注册</button>
					</Form>
				)}
				<TipBox className={tipBoxClass}>
					<div className="head" onClick={() => switchHelp(false)}>
						<i className="iconfont chicken-fanhui1"></i>帮助
					</div>
					<div className="body">
						{helpList.map(({ q, a }) => (
							<HelpItem>
								<p className="question">{q}</p>
								<p className="answer">{a}</p>
							</HelpItem>
						))}
					</div>
				</TipBox>
			</Content>
		</Wrapper>
	);
};

export default LoginPage;
