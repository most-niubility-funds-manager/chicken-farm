import Login from "../views/login";
import Welcome from "../views/welcome";
import Setting from "../views/setting";
import Market from "../views/market";

const routes = [
	{
		path: "/login",
		component: Login,
	},
	{
		path: "/welcome",
		component: Welcome,
	},
	{
		path: "/setting",
		component: Setting,
	},
	{
		path: "/market",
		component: Market,
	},
];

export default routes;
