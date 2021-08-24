import React from 'react';
import styles from './Main.module.css'
import Link from 'next/link'
import { Provider } from 'react-redux';
import { ConfigProvider } from "antd";
import configureAppStore from "../../configureStore";

// import { Link } from 'react-router-dom'
import {getUser} from '../../services/authService'
const { Header, Content, Footer } = Layout;
import { Layout, Menu, Breadcrumb } from 'antd';


const store = configureAppStore();
function MainUi(props) {

    const user = getUser();
    return (
        <Provider store={store}>
        <ConfigProvider>
        {
            user &&
            <Layout className={styles.layout}>
            <Header>
                <div className={styles.logo} />
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key={"Home"}> <Link href='/schools'>Home</Link></Menu.Item>
                    <Menu.Item key={"School"}><Link href='/schools'>Schools</Link></Menu.Item>
                    <Menu.Item key={"Classes"}><Link href='/classesgategories'>Classes</Link></Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>Home</Breadcrumb.Item>
                </Breadcrumb>
                <div className={styles.sitelayoutcontent} style={{width:"100%"}}>
                    {props.children}
                </div>
            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
        </Layout>
        }
        {!user && <h1><Link href='/auth/login'>Back To Login Page</Link></h1>}
        </ConfigProvider>
    </Provider>
    )
}

export default MainUi
