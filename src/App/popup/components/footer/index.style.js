import styled from "styled-components";

const Wrapper = styled.div.attrs({ className: "footer" })`
	width: 100%;
	height: 36px;
	position: absolute;
	bottom: 0;
	padding: 0 10px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 12px;
	background-color: ${(props) => props.theme.footer};
	color: ${(props) => props.theme.normal};
`;

const StateBox = styled.div.attrs({ className: "state-box" })`
	width: 60px;
	height: 24px;
	font-size: 12px;
	color: ${(props) => props.theme.normal};
	text-align: center;
	line-height: 2;
	border-radius: 2px;
	background-color: ${(props) => (props.isOpen ? props.theme.field : props.theme.status)};
`;

const IncomeBox = styled.p.attrs({ className: "income-box" })`
	width: auto;
	height: 36px;
	line-height: 36px;
	font-size: 12px;
	text-align: left;
	white-space: nowrap;
	color: ${(props) => props.theme.normal};
	margin-right: auto;
	margin-left: 15px;

	span {
		color: ${(props) => props.theme.increase};

		&.bad {
			color: ${(props) => props.theme.decrease};
		}
	}
`;

const Toolbar = styled.div`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-left: auto;
	flex-shrink: 0;

	span {
		width: 24px;
		height: 24px;
		border-radius: 2px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;

		&:hover {
			background-color: #000;
		}
	}
`;

export { Wrapper, StateBox, IncomeBox, Toolbar };
