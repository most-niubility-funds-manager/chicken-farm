/*
 * @Date: 2020-07-21 16:52:41
 * @LastEditors: elegantYu
 * @LastEditTime: 2020-08-30 15:49:19
 * @Description: 主题色
 */
import C from "./chromatography";

const dark = {
	increase: C["color-red-1"],
	decrease: C["color-green-1"],
	field: C["color-blue-3"],
	button: C["color-blue-4"],
	border: C["color-blue-7"],
	footer: C["color-black-2"],
	searchBg: C["color-black-1"],
	searchBtn: C["color-blue-2"],
	searchBtnHover: C["color-blue-15"],
	normal: C["color-white-1"],
	marqueeColor: C["color-white-4"],
	theadBg: C["color-black-4"],
	tbodyBg: C["color-black-11"],
	tableFixShadow: C["color-black-5"],
	tabelCellHover: C["color-blue-5"],
	background: C["color-black-3"],
	status: C["color-yellow-2"],
	toolBtn: C["color-blue-1"],
	toolBtnHover: C["color-blue-8"],
	incomeBg: C["color-blue-7"],
	tableDeleteBtn: C["color-blue-2"],
	tableInput: C["color-blue-11"],
	tableInputFocus: C["color-blue-10"],
	tableInputFocusBg: C["color-blue-12"],
	tableSortDefault: C["color-black-10"],
	tableSortActive: C["color-yellow-4"],
	tableCodeColor: C["color-white-3"],

	searchPageBg: C["color-blue-6"],
	searchShadow: C["color-black-6"],
	listBg: C["color-black-2"],
	addBtn: C["color-blue-1"],
	addBtnDisabled: C["color-black-7"],
	searchTip: C["color-white-3"],
	errorBorder: C["color-red-1"],
	errorBg: C["color-red-3"],
	errorBgAnimate: C["color-red-4"],

	tabNavBorder: C["color-blue-3"],
	tabNavBg: C["color-black-8"],
	tabNavColor: C["color-white-3"],
	cellColor: C["color-green-3"],
	cellBorder: C["color-black-9"],
	increaseBg: C["color-red-1"],
	decreaseBg: C["color-green-2"],
	tabNewsText: C["color-white-3"],
	tabNewsBg: C["color-black-1"],
	tabNewHover: C["color-black-4"],
	tabNewBorder: C["color-black-5"],
	formInputBg: C["color-blue-9"],
	formInputReadonly: C["color-black-2"],

	deleteDescCode: C["color-yellow-3"],
	deleteDoneBg: C["color-red-2"],
	deleteDoneColor: C["color-white-1"],
	deleteCancelBg: C["color-white-3"],
	deleteCancelColor: C["color-black-1"],

	loading: C["color-yellow-1"],

	menuItemHover: C["color-blue-13"],
	menuBg: C["color-blue-14"],
	menuIcon: C["color-white-1"],
	importCardBtnBg: C["color-white-5"],
	importCardBtnDoneBg: C["color-blue-1"],
	importCardBtn: C["color-white-1"],
	importCardBg: C["color-black-12"],
	importSucc: C["color-green-1"],
	importError: C["color-red-1"],
	importLoad: C["color-black-10"],
};

const darkReverse = {
	...dark,
	increase: C["color-green-1"],
	decrease: C["color-red-1"],
	increaseBg: C["color-green-2"],
	decreaseBg: C["color-red-1"],
};

export const theme = {
	light: {},
	dark,
	darkReverse,
};
