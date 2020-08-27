import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { Wrapper, ListItem } from "./index.style";
import { Switch } from "antd";
import "antd/dist/antd.css";
import { getFundsCode } from "../../services";
import { getLocal, setLocal } from '../../services/localStorage'
import { exportTxt } from "../../../../utils";
import { setImportState, toggleWideScreen as tws } from '../../redux/actions'
import Constants from '../../../../constants'

const Menu = (props) => {
  const { theme, active, closeEvent } = props
  const userConfig = getLocal(Constants.LOCAL_CONFIG)
  const [notify, setNotify] = useState(userConfig.notify || false)
  const [wideScreen, setWideScreen] = useState(userConfig.wideScreen || false)
  const [creaseReverse, setCreaseReverse] = useState(userConfig.creaseReverse || false)
  const dispatch = useDispatch()

  // 宽屏开关
  const toggleWideScreen = () => {
    const value = !wideScreen
		dispatch(tws(value))
		setWideScreen(value)
    setLocal(Constants.LOCAL_CONFIG, { wideScreen: value })
  }

  // 颜色反转
  const toggleCrease = () => {
    const value = !creaseReverse
    setCreaseReverse(value)
    setLocal(Constants.LOCAL_CONFIG, { creaseReverse: value })
  }

  // 消息通知开关
  const toggleNotify = () => {
    const value = !notify
    setNotify(value)
    setLocal(Constants.LOCAL_CONFIG, { notify: value })
  }

  // 导出数据
	const exportData = () => {
		getFundsCode().then((_) => {
      const content = `#${JSON.stringify(_)}#`
			exportTxt(`打开同步基金数据`, content)
			closeEvent()
		});
  };
  
  // 导入数据
  const importData = () => {
		dispatch(setImportState(true))
		closeEvent()
  }

	return (
		<Wrapper className={ !active && 'cancel' }>
			<ListItem onClick={toggleWideScreen}>
				<i>
					<svg width="20" height="20" viewBox="0 0 20 20">
						<path
							d="M15.963 16.762c1.485 0 2.227-.742 2.227-2.203v-9.04c0-1.46-.742-2.21-2.227-2.21H3.971c-1.484 0-2.234.742-2.234 2.21v9.04c0 1.46.75 2.203 2.234 2.203h11.992zm-.023-1.016H3.987c-.797 0-1.227-.422-1.227-1.242v-8.93c0-.82.43-1.242 1.227-1.242H15.94c.781 0 1.234.422 1.234 1.242v8.93c0 .82-.453 1.242-1.234 1.242zm-2.867-2.64c.132 0 .25-.055.328-.133l2.578-2.586c.117-.11.18-.227.18-.367 0-.133-.055-.242-.18-.367L13.4 7.067a.435.435 0 00-.328-.133.452.452 0 00-.461.46c0 .141.062.259.148.345L13.823 8.8l.906.79-1.438-.048h-6.64l-1.438.047.899-.789 1.07-1.062a.477.477 0 00.14-.344.45.45 0 00-.452-.461c-.141 0-.25.047-.336.133L3.955 9.653c-.125.125-.18.234-.18.367 0 .14.063.258.18.367l2.579 2.586a.485.485 0 00.336.133.45.45 0 00.453-.461.448.448 0 00-.141-.344l-1.07-1.055-.907-.797 1.446.047h6.64l1.438-.047-.906.797-1.063 1.055a.454.454 0 00-.148.344c0 .258.195.46.46.46z"
							fill="#fff"
							fill-rule="nonzero"
						></path>
					</svg>
				</i>
				<span>宽屏模式</span>
				<Switch size="small" defaultChecked={wideScreen} checked={wideScreen}></Switch>
			</ListItem>
			<ListItem onClick={toggleCrease}>
				<i className="iconfont"></i>
				<span>涨跌反转</span>
				<Switch size="small" defaultChecked={creaseReverse} checked={creaseReverse}></Switch>
			</ListItem>
      <ListItem onClick={toggleNotify}>
        <i className="iconfont chicken-notice"></i>
        <span>每日交易提醒</span>
        <Switch size="small" defaultChecked={notify} checked={notify}></Switch>
      </ListItem>
			<ListItem onClick={exportData}>
				<i>
					<svg width="20" height="20" viewBox="0 0 20 20">
						<path
							d="M11.727 4c2.968 0 5.289 2.36 5.25 5.617 1.453.57 2.32 1.899 2.32 3.414 0 1.985-1.703 3.563-3.89 3.563L5.32 16.586c-2.468 0-4.32-1.766-4.32-3.89 0-1.782 1.047-3.227 2.688-3.454.023-2.047 1.992-3.43 3.78-2.851C8.32 5.086 9.719 4 11.728 4zm0 1.016c-1.922 0-3.032 1.078-3.75 2.367-.047.07-.094.094-.18.062-1.54-.53-3.18.235-3.18 2.446 0 .093-.039.14-.133.14-1.562 0-2.46 1.172-2.46 2.664 0 1.555 1.398 2.867 3.296 2.867l10.086.008c1.617 0 2.867-1.117 2.867-2.539 0-1.336-.859-2.344-2.195-2.656-.086-.023-.117-.078-.11-.164.024-.328.04-.703.024-1.024-.14-2.257-1.844-4.171-4.265-4.171zm-.899 2.548c.221 0 .4.18.4.4v4.963l1.767-1.768.063-.051a.4.4 0 01.503.617l-2.45 2.45-.062.05a.4.4 0 01-.503-.05L8.07 11.7l-.052-.063a.4.4 0 01.617-.503l1.793 1.792V7.964l.008-.08a.4.4 0 01.391-.32z"
							fill="#fff"
							fill-rule="nonzero"
						></path>
					</svg>
				</i>
				<span>导出数据</span>
			</ListItem>
			<ListItem onClick={importData}>
				<i>
					<svg width="20" height="20" viewBox="0 0 20 20">
						<path
							d="M11.727 4c2.968 0 5.289 2.36 5.25 5.617 1.453.57 2.32 1.899 2.32 3.414 0 1.985-1.703 3.563-3.89 3.563L5.32 16.586c-2.468 0-4.32-1.766-4.32-3.89 0-1.782 1.047-3.227 2.688-3.454.023-2.047 1.992-3.43 3.78-2.851C8.32 5.086 9.719 4 11.728 4zm0 1.016c-1.922 0-3.032 1.078-3.75 2.367-.047.07-.094.094-.18.062-1.54-.53-3.18.235-3.18 2.446 0 .093-.039.14-.133.14-1.562 0-2.46 1.172-2.46 2.664 0 1.555 1.398 2.867 3.296 2.867l10.086.008c1.617 0 2.867-1.117 2.867-2.539 0-1.336-.859-2.344-2.195-2.656-.086-.023-.117-.078-.11-.164.024-.328.04-.703.024-1.024-.14-2.257-1.844-4.171-4.265-4.171zm-.678 2.614l.062.052 2.45 2.45a.4.4 0 01-.503.616l-.063-.051-1.766-1.768v4.963a.4.4 0 01-.792.08l-.009-.08.001-4.962-1.793 1.792a.4.4 0 01-.617-.503l.052-.063 2.475-2.474a.4.4 0 01.503-.052z"
							fill="#fff"
							fill-rule="nonzero"
						></path>
					</svg>
				</i>
				<span>导入数据</span>
			</ListItem>
			<ListItem>
				<i className="iconfont chicken-wenhao"></i>
				<span>帮助文档</span>
			</ListItem>
		</Wrapper>
	);
};

export default Menu;
