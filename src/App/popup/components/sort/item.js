import React, { useState, useRef } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
	width: 100%;
	height: auto;
	padding: 6px 16px;
	display: grid;
	grid-template-columns: 20px 1fr 30px 30px;
	background-color: var(--sort-bg);
	align-items: center;
	border-bottom: 2px solid var(--sort-item-border);
	transition: all 0.05s linear;
	user-select: none;

	&.active {
		background-color: var(--sort-item-active);
	}
`;

const SelectIcon = styled.div`
	width: 14px;
	height: 14px;
	border-radius: 50%;
	border: 1px solid var(--sort-select-border);
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: center;

	i {
		font-size: 12px;
		color: var(--sort-select);
		opacity: 0;
	}

	&.active {
		border: none;
		background-color: var(--sort-select-active);
		i {
			opacity: 1;
		}
	}
`;

const NameBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 4px;
	cursor: pointer;

	p {
		font-size: 13px;
		color: var(--table-tr);
		white-space: pre-wrap;
		line-height: 1.3;
	}

	.code {
		display: flex;
		align-items: center;
		font-size: 12px;
		color: var(--table-tr-code);
		gap: 4px;
	}

	.badge {
		padding: 2px;
		font-size: 12px;
		color: var(--table-badge);
		background-color: var(--table-badge-bg);
		border-radius: 2px;
		transform: scale(0.8);
		transform-origin: left;
	}
`;

const DragBox = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: grab;
	&:hover i {
		color: var(--sort-item-drag-active);
	}
	i {
		font-size: 20px;
		color: var(--sort-item-drag);
		transition: all 0.12s;
	}
`;

const Top = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
	&:hover i {
		color: var(--sort-item-drag-active);
	}
	i {
		font-size: 20px;
		color: var(--sort-item-drag);
		transition: all 0.12s;
	}
`;

const Item = ({ data, styled, mouseDownEvent, selectEvent, setTopEvent }) => {
	const { code, init_cost, init_unit, sort, name, selected } = data;

	return (
		<Wrapper style={styled} className={selected && "active"}>
			<SelectIcon className={selected && "active"} onClick={selectEvent}>
				<i className="iconfont chicken-xuanzhong"></i>
			</SelectIcon>
			<NameBox onClick={selectEvent}>
				<p>{name}</p>
				<span className="code">
					{code}
					{init_cost && init_unit && <span className="badge">持有</span>}
				</span>
			</NameBox>
			<Top onClick={setTopEvent}>
				<i className="iconfont chicken-zhiding"></i>
			</Top>
			<DragBox onMouseDown={mouseDownEvent}>
				<i className="iconfont chicken-tuozhuai1"></i>
			</DragBox>
		</Wrapper>
	);
};

export default Item;
