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

const Td = styled.td`
	height: 40px;
	background-color: ${(props) => props.theme.tbodyBg};
	color: ${(props) => (props.keyword ? props.theme.field : props.theme.normal)};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 0 10px;
	transition: background 0.2s ease-out;
`;

const Tr = styled.tr`
	border-bottom: 1px solid ${(props) => props.theme.border};
	
	&:last-of-type {
	  border-bottom: none;
	}

	&.active {
		td {
			// background-color: ${(props) => props.theme.tabelCellHover};
			background-color: #111;
			cursor: pointer;
		}
	}
`;

const Tag = styled.span`
	padding: 4px;
	box-sizing: content-box;
	border-radius: 2px;

  &.decrease {
    background-color: ${props => props.theme.decrease}
  }
  &.increase {
    background-color: ${props => props.theme.increase}
  }
`;

export { Wrapper, Table, Tr, Td, Th, Tag };
