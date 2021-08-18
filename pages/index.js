import styles from '../styles/Home.module.css'
import React from 'react';
// import RouterGuard from '../routes/RouteGuard';
import {Provider} from 'react-redux';
import {ConfigProvider} from "antd";
import {BrowserRouter} from "react-router-dom";
// import configureAppStore from "../configureStore";

// import MainUi from '../components/main/Main.ui'
import Main from '../components/main'
// const store = configureAppStore();

export default function Home() {
  return (
    // <Provider store={store}>
        <ConfigProvider>
                <Main/>
        </ConfigProvider>
// </Provider>
  )
}
