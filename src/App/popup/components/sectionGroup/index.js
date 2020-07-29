import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Wrapper } from "./index.style";
import Section from "../section/index";
import { getLargeCap } from "../../services/index";
import { requestRecursion } from "../../../../utils";

const SectionGroup = () => {
  const [data, setData] = useState([]);
  const theme = useSelector((state) => state.theme);
  const isMarketOpen = useSelector((state) => state.isMarketOpen)
  const intervalCheck = () => !isMarketOpen

  useEffect(() => {
    requestRecursion(getLargeCap, intervalCheck, 1000, (originData) => {
      const formatData = originData.map((v) => ({
        ...v,
        theme: {
          background: v.count > 0 ? theme.increase : theme.decrease,
          color: theme.normal,
        },
      }));
  
      setData(formatData);
    });
  }, [isMarketOpen])


	return (
		<Wrapper>
			{data.map((item) => (
				<Section data={item} key={item.name} />
			))}
		</Wrapper>
	);
};

export default SectionGroup;
