import React from 'react';
import styles from './Main.module.css'
import Link from 'next/link'
import { Provider } from 'react-redux';
import { ConfigProvider } from "antd";
import configureAppStore from "../../configureStore";

// import { Link } from 'react-router-dom'

const { Header, Content, Footer } = Layout;
import { Layout, Menu, Breadcrumb } from 'antd';


const store = configureAppStore();
function MainUi(props) {
    return (
        <Provider store={store}>
        <ConfigProvider>
        <Layout className={styles.layout}>
            <Header>
                <div className={styles.logo} />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key={"Home"}> Home</Menu.Item>
                    <Menu.Item key={"School"}>School</Menu.Item>
                    <Menu.Item key={"Classes"}>Classes</Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.sitelayoutcontent}>
                    {props.children}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        </ConfigProvider>
    </Provider>
    )
}

export default MainUi
