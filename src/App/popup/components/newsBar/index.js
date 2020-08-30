import React, { useEffect, useState, useRef } from "react";
import { Wrapper, Title, Marquee, LinkWrapper } from "./index.style";
import { fetchNewsInfo } from "../../services";
import { useSelector } from "react-redux";

const NewsBar = () => {
	const theme = useSelector((state) => state.theme);
	const [news, setNews] = useState([]);
	const [offset, setOffset] = useState(0);
	const [msgLength, setMsgLength] = useState(0);
	const [stop, setStop] = useState(false);
	const [timer, setTimer] = useState(null);
	const interval = 200;
	const speed = 5;

	useEffect(() => {
		fetchNewsInfo().then((_) => {
			const len =
				_.reduce((len, { title }) => {
					len = len + title.length;
					return len;
				}, 0) * 12;
			setNews([..._]);
			setMsgLength(len);
		});
	}, []);

	useEffect(() => {
		msgLength && marqueeMsg();
	}, [msgLength, offset, stop]);

	const marqueeMsg = () => {
		const distance = offset + speed > msgLength ? 0 : offset + speed;
		if (!stop) {
			const time = setTimeout(() => {
        // 更改offset会重新调用此方法
        setOffset(distance);
			}, interval);
			setTimer(time);
		} else {
			clearTimeout(timer);
		}
	};

	const mouseenterHandler = () => setStop(true);
	const mouseleaveHandler = () => setStop(false);

	const openNewResource = () => window.open('https://news.10jqka.com.cn/realtimenews.html')

	return (
		<Wrapper>
			<Title theme={theme} onClick={openNewResource}>最新资讯:</Title>
			<Marquee onMouseEnter={mouseenterHandler} onMouseLeave={mouseleaveHandler}>
				<LinkWrapper theme={theme} style={{ transform: `translateX(-${offset}px)` }}>
					{news.map(({ url, title }) => (
						<a href={url} target="_blank" key={url}>
							{title}
						</a>
					))}
				</LinkWrapper>
			</Marquee>
		</Wrapper>
	);
};

export default NewsBar;
