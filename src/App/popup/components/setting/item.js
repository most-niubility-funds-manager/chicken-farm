import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { setUserLocalSetting } from "../../services";

const Wrapper = styled.div`
	width: 100%;
	height: 20px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 13px;
	color: var(--setting-block);
	padding: 0 18px;
`;

const SwitchBtn = styled.div`
	width: 28px;
	height: 16px;
	border-radius: 8px;
	position: relative;
	cursor: pointer;
	background-color: var(--setting-switch);
	overflow: hidden;

	&::before {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		transform: translateX(calc(-100% - 2px));
		width: 100%;
		height: 100%;
		background-color: var(--setting-switch-active);
		transition: all 0.15s ease;
	}

	span {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background-color: var(--setting-switch-span);
		position: absolute;
		top: 2px;
		left: 2px;
		transition: all 0.15s linear;
	}

	&.active {
		&::before {
			transform: translateX(0);
		}

		span {
			left: calc(100% - 14px);
		}
	}
`;

const Item = (props) => {
	const { text, active, keyName } = props;
	const [btnActive, setBtnActive] = useState(false);

	const toggleSwitchHandler = () => {
		setBtnActive(!btnActive);
		setUserLocalSetting({ key: keyName, value: !btnActive });
	};

	useEffect(() => {
		setBtnActive(active)
	}, [active])

	return (
		<Wrapper>
			<p>{text}</p>
			<SwitchBtn className={btnActive && "active"} onClick={toggleSwitchHandler}>
				<span></span>
			</SwitchBtn>
		</Wrapper>
	);
};

export default Item;
