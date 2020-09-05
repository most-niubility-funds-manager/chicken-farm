import styled from "styled-components";

const Layout = styled.div.attrs({ className: "layout" })`
	width: 100%;
	height: auto;
	margin-bottom: 40px;
`;

const Title = styled.h2`
	height: 60px;
	font-size: 36px;
	text-align: left;
	font-weight: bold;
	line-height: 60px;
	margin-bottom: 0.5em;
`;

const SubTitle = styled.h4`
	height: 36px;
	font-size: 24px;
	text-align: left;
	font-weight: bold;
	margin-bottom: 0.5em;
`;

const Sentence = styled.p`
	font-size: 16px;
	line-height: 1.6;
	margin-bottom: 0.8em;
`;

const ImgBox = styled.div`
	padding: 15px 20px;
	display: flex;
	flex-direction: column;
	align-items: center;

	img {
		max-width: 640px;
		border-radius: 1px;
		box-shadow: rgba(0, 0, 0, 0.4) 2px 2px 10px 0, rgba(0, 0, 0, 0.4) -2px 2px 10px 0;
		margin-bottom: 10px;
	}

	p {
		display: inline-block;
		max-width: 640px;
		font-size: 14px;
		color: #999;
		padding: 2px 4px;
	}
`;

export { Layout, Title, SubTitle, Sentence, ImgBox };
