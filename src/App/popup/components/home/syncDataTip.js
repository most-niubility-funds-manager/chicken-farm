/*
 * @Date: 2020-11-02 17:48:10
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-02 21:39:08
 * @Description: 旧版本本地数据同步新版本账号数据
 */
import React, { useState, Fragment } from "react";
import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: "syncData-tip" })`
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1;

	&.active {
		.mask {
			backdrop-filter: blur(5px);
		}
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		backdrop-filter: blur(0);
	}

	.content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 255px;
		border-radius: 6px;
		padding: 15px 20px;
		background-color: var(--login-bg);

		.head {
			height: 24px;
			display: flex;
			align-items: center;
			justify-content: space-between;
			font-size: 14px;
			color: var(--login-tab-active);
			margin-bottom: 10px;

			i {
				cursor: pointer;
			}
		}

		.body {
			font-size: 12px;
			line-height: 1.5;
			color: var(--login-label);
		}
	}
`;

const SyncDataTip = () => {
	const [isOpen, setOpen] = useState(true);

	// 判断本地是否有已更新提示 already-sync-oldData
	const checkLocal = () => localStorage.getItem("already-sync-oldData");

	const closeTipHandler = () => setOpen(false);

	if (!checkLocal()) {
		return (
			<Fragment>
				{isOpen && (
					<Wrapper className={isOpen && "active"}>
						<div className="mask"></div>
						<div className="content">
							<div className="head">
								<span>数据同步提示</span>
								<i className="iconfont chicken-close" onClick={closeTipHandler}></i>
							</div>
							<div className="body">
								基金管理助手1.2.0版本的本地数据，将在新版本注册账户后同步。
							</div>
						</div>
					</Wrapper>
				)}
			</Fragment>
		);
	}
	return null;
};

export default SyncDataTip;
