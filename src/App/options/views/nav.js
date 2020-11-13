import React, { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Wrapepr = styled.div.attrs({ className: "nav-wrapper" })`
	width: 100%;
	height: 100%;
	overflow: overlay;
	background-color: var(--nav-background);
	border-right: 1px solid var(--nav-border);
`;

const Routes = styled.div.attrs({ className: "nav-group" })`
	width: 100%;
	height: auto;

	.nav-list {
		height: 40px;
		padding: 10px 15px;
		display: flex;
		align-items: center;
		cursor: pointer;
		color: var(--nav-item);
		font-size: 14px;

		&:hover, &.active {
			color: var(--nav-item-hover);
		}
	}

	ul {
		padding-left: 20px;
	}
`;

const Nav = () => {
	return (
		<Wrapepr>
			<Routes>
				<NavLink to="/welcome" className="nav-list" activeClassName="active">
					简介
				</NavLink>
				<NavLink to="/setting" className="nav-list" activeClassName="active">
					基本配置
				</NavLink>
				<ul>
					<li>
						<NavLink to="/market" className="nav-list" activeClassName="active">
							大盘版块
						</NavLink>
					</li>
				</ul>
			</Routes>
		</Wrapepr>
	);
};

export default Nav;
