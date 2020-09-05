import React, { useState, useEffect } from "react";
import { Layout, Title, Sentence, ImgBox } from "../components/styleComponent";

const Intro = (props) => {
	const { title } = props;

	return (
		<Layout>
			<Title>{title}</Title>
			<Sentence>点击右下角的🔎按钮，唤起搜索页面。输入基金名称或者基金代码后模糊查询到所有结果，添加所需基金后，关闭窗口便能够看到基金的实时动态。</Sentence>
			<ImgBox>
				<img src="https://i.loli.net/2020/09/05/GZPJ6vgtnfUKw84.gif" alt="" title="" />
				<p>添加基金的正确姿势✅</p>
			</ImgBox>
		</Layout>
	);
};

export default Intro;
