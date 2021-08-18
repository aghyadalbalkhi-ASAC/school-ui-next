import React, {Component, Fragment} from 'react';
import './Main.style.css';
import {connect} from 'react-redux';
import {
    Avatar,
    Button,
    Divider,
    Drawer,
    Dropdown,
    Menu,
    PageHeader,
    Space,
    Image,
    Select
} from 'antd';
import {
    MenuOutlined,
    UserOutlined,
    DashboardOutlined,
    ShopOutlined,
    DollarOutlined,
    EnvironmentOutlined,
    SettingOutlined
} from '@ant-design/icons';
import {Link} from 'react-router-guard';
import SubMenu from 'antd/lib/menu/SubMenu';
import MainModel from './Main.model';
import {getUser} from '../../services/authService';


class MainUi extends Component<any, any> {
    state = {visible: false};

    componentDidMount() {
        this.props.checkLoggedUser();
    }

    onClose = () => {
        this.setState({
            visible: false
        });
    };

    showDrawer = () => {
        this.setState({
            visible: true
        });
    };

    closeDrawer = () => {
        this.setState({
            visible: false
        });
    };
    handleClick = (e: any) => {
        console.log('click', e);
    }


    menu = () => {
        let settings;

        return <Menu style={{minWidth: 150}} onClick={this.handleClick}>
            {settings}
            <SubMenu key="language" title={'Language'}>
                <Menu.Item key="en">English</Menu.Item>
                <Menu.Item key="ar">عربي</Menu.Item>
            </SubMenu>
            <Menu.Divider/>
            <Menu.Item onClick={this.props.logout}>{'Logout'}</Menu.Item>
        </Menu>
    };

    DropdownMenu = () => {
        const {t, user} = this.props;
        return (
            <Dropdown key="more" overlay={this.menu()}>
                <Button
                    style={{
                        border: 'none',
                        padding: 0
                    }}
                >
                    <Space size={10}>
                        <span className={'hide sm-show'}>{t('Hi,')} {user?.full_name || user?.email}</span>
                        <Avatar
                            style={{backgroundColor: '#0077c1'}}
                            icon={<UserOutlined/>}
                        />
                    </Space>
                </Button>
            </Dropdown>
        );
    };

    PublicDropdownMenu = () => {
        const {i18n} = this.props;
        let defaultValue = i18n.language
        if (defaultValue !== 'en' && defaultValue.indexOf('en') !== -1) {
            defaultValue = 'en';
        }
        return (
            <Select defaultValue={defaultValue} onChange={this.handleClick}>
                <Select.Option value="ar">عربي</Select.Option>
                <Select.Option value="en">English</Select.Option>
            </Select>
        );
    };

    getRoutes = () => {
        const {t, i18n} = this.props;

        return [
            {
                title: t('glossary:Dashboard'),
                icon: <DashboardOutlined/>,
                subMenu: [
                    {
                        link: '/dashboard/jobs',
                        title: t('glossary:Jobs'),
                    }
                ]
            },
            {
                title: t('glossary:Financials'),
                icon: <DollarOutlined/>,
                subMenu: [
                    {
                        link: '/admin/businesses/financials',
                        title: t('glossary:Businesses')
                    },
                    {
                        link: '/admin/employees/financials',
                        title: t('glossary:Employees')
                    }
                ]
            },
            {
                title: t('glossary:Businesses'),
                icon: <ShopOutlined/>,
                link: '/businesses'
            },
            {
                link: '/employees',
                title: t('glossary:Employees'),
                icon: <UserOutlined/>
            },
            {
                title: t('glossary:Addresses'),
                icon: <EnvironmentOutlined/>,
                subMenu: [
                    {
                        link: '/states',
                        title: t('glossary:States')
                    },
                    {
                        link: '/cities',
                        title: t('glossary:Cities')
                    },
                    {
                        link: '/areas',
                        title: t('glossary:Areas')
                    }
                ]
            },
            {
                title: t('glossary:Settings'),
                icon: <SettingOutlined/>,
                subMenu: [
                    {
                        link: '/system-settings',
                        title: t('glossary:General Settings'),
                    }
                ]
            }
        ];
    }


    render() {

        const {
            children,
            isLoggedUser = true,
            mapActions = [],
            t,
            i18n,
            isFullHeightPage = false
        }: any = this.props;
        const {visible}: any = this.state;
        const headerProps: any = {};

        /*if (isBusinessUser()) {
            mapActions.push(
                <Button
                    key={'create-job'}
                    onClick={() => history.push('/new-job')}
                >
                    {t('common:Create Job')}
                </Button>
            );
        }*/
        if (isLoggedUser) {
            headerProps.extra = [
                ...mapActions,
                <this.DropdownMenu key="more"/>
            ];
        } else {
            headerProps.extra = [
                <this.PublicDropdownMenu key="more"/>
            ];
        }
        let fullHeight = {};
        if (isFullHeightPage) {
            fullHeight = {height: '100%', display: 'flex'};
        }

        const routes = this.getRoutes();
        return (
            <>
                <div id={'header'} className={'no-print'}>
                    <PageHeader
                        // avatar={{src: headerLogo}}
                        ghost={false}
                        className="site-page-header"
                        title={
                            <Image
                                style={{height: 30, width: 'auto'}}
                                preview={false}
                                src={"fds"}
                            />
                        }
                        subTitle={<span className={'hide sm-show'}>{t("On-demand recruitment!")}</span>}
                        {...headerProps}
                    />
                    <Divider style={{margin: 0}}/>
                </div>

                <div
                    style={{paddingTop: '73px', ...fullHeight}}
                    className={'no-print-style main-wrapper'}
                >
                    {children}

                    <Drawer
                        title={t("Main Menu")}
                        placement={i18n.dir() === 'ltr' ? 'left' : 'right'}
                        bodyStyle={{padding: 0}}
                        closable={false}
                        onClose={this.onClose}
                        visible={visible}
                        key={'left-menu'}
                    >
                        <Menu
                            defaultSelectedKeys={[
                                routes[0].title.toLowerCase()
                            ]}
                            mode="inline"
                        >
                            {routes.map((route: any, index: number) => (
                                <Fragment key={index}>
                                    {route.subMenu &&
                                    route.subMenu.length > 0 ? (
                                        <SubMenu
                                            onTitleClick={() => {
                                                if (route.link) {
                                                    // goToLink(route.link);
                                                }
                                            }}
                                            key={index}
                                            title={
                                                <div>
                                                    {route.icon}
                                                    <span>{t(route.title)}</span>
                                                </div>
                                            }
                                        >
                                            {route.subMenu.map(
                                                (
                                                    subRoute: any,
                                                    sub_index: number
                                                ) => (
                                                    <Menu.Item
                                                        key={`${index}${sub_index}`}
                                                        onClick={
                                                            this.closeDrawer
                                                        }
                                                    >
                                                        <Link
                                                            to={
                                                                (route.link
                                                                    ? route.link +
                                                                    ''
                                                                    : '') +
                                                                subRoute.link
                                                            }
                                                        >
                                                            {subRoute.title}
                                                        </Link>
                                                    </Menu.Item>
                                                )
                                            )}
                                        </SubMenu>
                                    ) : (
                                        <Menu.Item
                                            key={index}
                                            icon={route.icon}
                                            onClick={this.closeDrawer}
                                        >
                                            <Link to={route.link}>
                                                {route.title}
                                            </Link>
                                        </Menu.Item>
                                    )}
                                </Fragment>
                            ))}
                        </Menu>
                    </Drawer>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state: any, ownProps: any) => state.main || {};

const mapDispatchToProps = (dispatch: any) => ({
    // setPageTitle: () => dispatch(MainModel.mainAction('Main')),
    checkLoggedUser: () => dispatch(MainModel.checkLoggedUserAction()),
    setLanguage: (lang: string) => dispatch(MainModel.setLanguageAction(lang)),
    logout: () => dispatch(MainModel.logoutAction())
});
export default connect(mapStateToProps, mapDispatchToProps)(
    (MainUi)
);
