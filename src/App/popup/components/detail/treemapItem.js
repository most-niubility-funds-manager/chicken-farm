import React, { Component } from "react";
import { STOCKSEARCH } from "../../../../background/api";

export default class Demo extends Component {
	static displayName = "TreemapItemDemo";

	static defaultProps = {};

	constructor(props) {
		super(props);
	}

	clickHander = (code) => {
		const url = STOCKSEARCH(code);
		window.open(url);
	}

	render() {
		const { depth, x, y, width, height, name, percent, bg, fontColor, code } = this.props;

		return (
			<g>
				<rect
					x={x}
					y={y}
					rx={4}
					ry={4}
					width={width}
					height={height}
					fill={bg}
					stroke="#1f2022"
					strokeWidth={2 / (depth + 1e-10)}
					strokeOpacity={1 / (depth + 1e-10)}
					onClick={() => this.clickHander(code)}
					style={{ cursor: 'pointer' }}
				/>
				{depth === 1 ? (
					<text
						x={x + 5}
						y={y + height - 25}
						textAnchor="left"
						fill="#333"
						stroke="none"
						fontSize={width < 65 ? 9 : 13}
					>
						{name}
					</text>
				) : null}
				{depth === 1 ? (
					<text
						x={x + 5}
						y={y + height - 10}
						textAnchor="left"
						fill={fontColor}
						stroke="none"
						fontSize={width < 65 ? 10 : 13}
						style={{ fontWeight: "bold" }}
					>
						{percent}
					</text>
				) : null}
			</g>
		);
	}
}
