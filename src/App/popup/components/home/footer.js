import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Saga from "@lib/saga";
import { getMarketStatus } from "../../services";

const Wrapper = styled.div.attrs({ className: "footer" })`
	width: 100%;
	height: 40px;
	background-color: var(--footer-bg);
	border-top: 1px solid var(--footer-border);
	display: flex;
	align-items: center;
	padding: 0 5px;
	color: var(--footer-font);

	.stateText {
		width: 60px;
		height: 24px;
		font-size: 12px;
		text-align: center;
		line-height: 2;
		border-radius: 2px;
		margin-right: 15px;

		&.open {
			background-color: var(--footer-state-open);
		}
		&.close {
			background-color: var(--footer-state-close);
		}
	}
`;

const UserDetail = styled.p``;

const IconGroup = styled.div`
	display: flex;
	align-items: center;
	gap: 4px;
	margin-left: auto;

	.iconfont {
		width: 28px;
		height: 28px;
		border-radius: 2px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.15s linear;

		&:hover {
			background-color: var(--footer-icon-hover);
		}
	}
`;

const Footer = (props) => {
	const { search } = props;
	const [isOpen, setOpen] = useState(false);
	const [stateText, setStateText] = useState("已休市");
	const saga = new Saga(getMarketStatus);
	const stateTextClass = `stateText ${isOpen ? "open" : "close"}`;

	useEffect(() => {
		saga.start(({ text, status }) => {
			setOpen(status);
			setStateText(text);
		}, 2000);
	}, [isOpen]);

	return (
		<Wrapper>
			<span className={stateTextClass}>{stateText}</span>
			<IconGroup>
				<span className="iconfont chicken-search-fill" onClick={search}></span>
				<span className="iconfont chicken-more"></span>
			</IconGroup>
		</Wrapper>
	);
};

export default Footer;
