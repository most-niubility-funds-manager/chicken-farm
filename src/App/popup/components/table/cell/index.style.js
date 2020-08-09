import styled from 'styled-components'

const Td = styled.td`
	height: 40px;
	background-color: ${(props) => props.theme.tbodyBg};
	color: ${(props) => (props.keyword ? props.theme.field : props.theme.normal)};
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 0 10px;
	transition: background 0.2s ease-out;

	&:first-of-type:hover {
		text-decoration: underline;
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

const Input = styled.input`
	width: 80px;
	height: 24px;
	border-radius: 4px;
	text-align: right;
	font-size: 12px;
	color: ${props => props.theme.normal};
	background-color: transparent;
	border: 1px solid ${props => props.theme.tableInput};
	transition: all 0.15s ease-out;

	&:focus {
		border: 1px solid ${props => props.theme.tableInputFocus};
		background-color: ${props => props.theme.tableInputFocusBg};
	}
`

const Btn = styled.button`
	box-sizing: content-box;
	padding: 4px;
	font-size: 12px;
	background-color: ${props => props.theme.tableDeleteBtn};
	color: ${props => props.theme.normal};
	cursor: pointer;
	border-radius: 4px;
`

export { Td, Tag, Input, Btn }