import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Wrapper } from "./index.style";
import Section from "./section/index";
import { getLargeCap } from "../../services/index";
import { requestRecursion } from "../../../../utils";

const SectionGroup = () => {
  const [data, setData] = useState([]);
  const [type, setType] = useState(0)
  const theme = useSelector((state) => state.theme);
  const isMarketOpen = useSelector((state) => state.isMarketOpen)
  const intervalCheck = () => !isMarketOpen

  useEffect(() => {
    requestRecursion({
      fns: getLargeCap, 
      check: intervalCheck, 
      time: 3000,
      callback: (originData) => {
        const formatData = originData.map((v) => ({
          ...v,
          theme: {
            background: theme.theadBg,
            color: theme.normal,
            crease: v.count > 0 ? theme.increase : theme.decrease,
          },
        }));
    
        setData(formatData);
      }
    });
  }, [isMarketOpen])

  const changeType = () => {
    const num = type + 1 > 2 ? 0 : type + 1
    setType(num)
  }

	return (
		<Wrapper theme={theme}>
			{data.map((item) => (
				<Section data={item} key={item.name} clickEvent={changeType} type={type} />
			))}
		</Wrapper>
	);
};

export default SectionGroup;
