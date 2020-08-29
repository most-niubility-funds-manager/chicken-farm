import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: "subtable-wrapper" })`
	width: 100px;
	height: auto;
	display: flex;
	align-items: center;
	position: absolute;
	top: 0;
	left: 0;

	&.left {
		position: sticky;
		left: 0px;
		border-right: 1px solid ${(props) => props.theme.border};
		z-index: 1;
	}

	&.right {
		position: sticky;
		right: -1px;
		border-left: 1px solid ${(props) => props.theme.border};
		z-index: 1;
	}
`;

const Table = styled.table.attrs({ className: "subtable" })`
	width: 100%;
	border: none;
	font-size: 12px;
	border-collapse: collapse;
	table-layout: fixed;

	&.rightBorder {
		border-right: 1px solid ${(props) => props.theme.border};
	}
	&.leftBorder {
		border-left: 1px solid ${(props) => props.theme.border};
		cursor: default;
	}
`;

const Th = styled.th`
	position: sticky;
	top: 0px;
	height: 40px;
	background-color: ${(props) => props.theme.theadBg};
	color: ${(props) => props.theme.normal};
	padding: 0 10px;
`;

const Tr = styled.tr`
	border-bottom: 1px solid ${(props) => props.theme.border};
	
	&:last-of-type {
	  border-bottom: none;
	}

	&.active {
		td {
			background-color: #111;
		}
	}
`;

export { Wrapper, Table, Tr, Th };
