import React, { useState, useEffect } from "react";
import { Wrapper, Tag } from "./index.style";

const Income = (props) => {
	const { theme } = props;
	const colour = { ...theme, bg: theme.increase };
	const [isHide, setHide] = useState(false);

  const hideClickHandler = () => {
    setHide(!isHide)
  }

	return (
		<Wrapper theme={colour} onClick={hideClickHandler}>
			预估收益:<Tag theme={colour}>{isHide ? "$$$$" : "+12000.00"}</Tag>
		</Wrapper>
	);
};

export default Income;
