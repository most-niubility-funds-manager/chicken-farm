/*
 * @Date: 2020-11-19 18:57:21
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-11-20 13:02:25
 * @Description: 删除面板
 */
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { deleteBatchFund } from '../../services'

const slideUp = keyframes`
  0% {
		top: 0;
    opacity: 0;
	}
	10% {
		top: 40%;
		opacity: 0;
	}
  100% {
    top: 50%;
    opacity: 1;
  }
`;

const Wrapper = styled.div`
	position: fixed;
	top: 0;
	left: 0;
`;

const Mask = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	backdrop-filter: blur(0px);
	transition: all 0.2s linear;
	will-change: backdrop-filter;
	pointer-events: none;

	&.active {
		backdrop-filter: blur(5px);
		pointer-events: auto;
	}
`;

const Content = styled.div`
	position: fixed;
	top: 0;
	left: 50%;
	width: 255px;
	height: 150px;
	border-radius: 6px;
	background-color: var(--detail-sync-bg);
	padding: 15px 20px;
	opacity: 0;
	transform: translate(-50%, -50%);
	pointer-events: none;

	&.active {
		animation: ${slideUp} 0.18s linear 0.5s forwards;
		pointer-events: auto;
	}
`;

const Head = styled.div`
	width: 100%;
	height: 24px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 15px;
	color: var(--detail-sync-title);

	i {
		font-size: 14px;
		color: var(--detail-sync-icon);
		cursor: pointer;
	}
`;

const Title = styled.div`
  font-size: 14px;
  padding: 10px 0;
  text-align: center;
  color: var(--sort-delete-title);
`;

const Footer = styled.button`
	width: 100%;
	height: 40px;
	color: var(--detail-sync-btn);
	background-color: var(--sort-delete-btn);
	font-size: 13px;
	border-radius: 6px;
	margin-top: auto;
	cursor: pointer;
`;

const DeletePanel = ({ user, active, list, closeEvent }) => {

  const confirmDeleteHandler = async () => {
    const params = {
      uid: user.uid,
      code: list.reverse().map(({ id }) => id)
    }
    await deleteBatchFund(params)

    closeEvent()
  }

	return (
		<Wrapper>
			<Mask className={active && "active"} onClick={closeEvent}></Mask>
			<Content className={active && "active"}>
				<Head>
					<span>删除提醒</span>
					<i className="iconfont chicken-close" onClick={closeEvent}></i>
				</Head>
				<Title>确认删除 {list.length} 条数据吗</Title>
				<Footer onClick={confirmDeleteHandler}>删除</Footer>
			</Content>
		</Wrapper>
	);
};

export default DeletePanel;
