import React, { useState, useEffect, Fragment } from "react";
import ReactDOM from "react-dom";
import { GlobalStyle } from "../styles";
import Banner from './views/banner'
import Content from './views/content'

ReactDOM.render(
	<Fragment>
		<GlobalStyle bg="#fff" />
    <Banner />
    <Content />
	</Fragment>,
	document.querySelector("#root")
);

console.log("nothing");
