import React, {Component} from 'react';
import {
    Breadcrumb,
    Button,
    Col,
    Divider,
    Menu,
    Popover,
    Row,
    Skeleton,
    Space,
    Typography
} from 'antd';
import MainWrapperUi from './MainWrapper.ui';
import Title from 'antd/lib/typography/Title';
import {goToLink} from '../../services/authService';
import {MenuOutlined} from '@ant-design/icons';
import {getBreakpoint} from "../../services/helpers";

const {Text} = Typography;

class BarPageUi extends Component<any, any> {
    getOverlay = (children: any) =>
        !children || !children.length ? (
            <div/>
        ) : (
            <Menu>
                {children.map((obj: any, index: number) =>
                    obj?.label ? <Menu.Item
                        key={index}
                        disabled={obj?.label === this.props.currentNav}
                        onClick={() => goToLink(obj.link)}
                    >
                        {obj?.label}
                    </Menu.Item> : null
                )}
            </Menu>
        );

    itemContent = (obj: any) =>
        obj.loading ? (
            <Skeleton.Button active={true}/>
        ) : (
            <Button
                type={'text'}
                icon={obj.icon}
                disabled={obj.label === this.props.currentNav}
                onClick={() => goToLink(obj.link)}
            >
                {obj.label}
            </Button>
        );

    getPageSubtitleView = (pageSubtitle: any) =>
        pageSubtitle ? (
            <>
                <Divider type="vertical"/>
                <Text type="secondary">{pageSubtitle}</Text>
            </>
        ) : null;

    getNavigationBreadcrumbView = (navigation: any) =>
        navigation.length ? (
            <>
                <Divider type="vertical"/>
                <Breadcrumb separator="|" className={'hide md-show'}>
                    {navigation.map((obj: any, index: number) =>
                        obj.children && obj.children.length > 0 ? (
                            <Breadcrumb.Item
                                key={index}
                                overlay={this.getOverlay(obj.children)}
                            >
                                {this.itemContent(obj)}
                            </Breadcrumb.Item>
                        ) : (
                            <Breadcrumb.Item key={index}>
                                {this.itemContent(obj)}
                            </Breadcrumb.Item>
                        )
                    )}
                </Breadcrumb>
            </>
        ) : null;

    getMobileNavigationBreadcrumbView = (mobileNavigation: any) =>
        mobileNavigation.length ? (
            <>
                <Divider type="vertical"/>
                <Breadcrumb separator="|" className={'md-hide'}>
                    {mobileNavigation.map((obj: any, index: number) =>
                        <Breadcrumb.Item
                            key={index}
                            overlay={this.getOverlay(obj.children)}
                        >
                            {this.itemContent(obj)}
                        </Breadcrumb.Item>
                    )}
                </Breadcrumb>
            </>
        ) : null;

    getParentRoutesBreadcrumbView = (parentRoutes: any) =>
        parentRoutes.length ? (
            <>
                <Divider type="vertical"/>
                <Breadcrumb separator="|">
                    {parentRoutes.map((obj: any, index: number) => (
                        <Breadcrumb.Item key={index}>
                            {obj.loading ? (
                                <Skeleton.Button active={true}/>
                            ) : (
                                <Button
                                    type={'text'}
                                    style={{
                                        paddingLeft: 0,
                                        paddingRight: 0
                                    }}
                                    onClick={() => goToLink(obj.link)}
                                >
                                    {obj.label}
                                </Button>
                            )}
                        </Breadcrumb.Item>
                    ))}
                </Breadcrumb>
            </>
        ) : null;

    render() {
        const {
            children,
            pageTitle = 'Untitled',
            pageSubTitle = null,
            actions = [],
            parentRoutes = [],
            navigation = [],
            mobileNavigation = [],
            maxWidth = 1200,
            publicPage = false,
            wideScreen = false
        } = this.props;

        const bp = getBreakpoint();
        return (
            <div
                style={{paddingTop: '80px'}}
                className={'no-print-style main-wrapper'}
            >
                <div id={'bar-page-header'} className={'no-print'} style={publicPage ? {top: 0} : {}}>
                    <div style={{backgroundColor: 'white', padding: '0 10px'}}>
                        <Row
                            style={{
                                maxWidth: wideScreen ? 1680 : maxWidth,
                                margin: '0 auto',
                                height: '55px'
                            }}
                            justify={'space-between'}
                            align={'middle'}
                        >
                            <Col>
                                <Space align="center" size={8}>
                                    <Title level={4}>{pageTitle}</Title>

                                    {this.getPageSubtitleView(pageSubTitle)}

                                    {/*
                                        mobileNavigation breadcrumb view
                                    */}
                                    {this.getMobileNavigationBreadcrumbView(
                                        mobileNavigation
                                    )}

                                    {/*
                                        navigation breadcrumb view
                                    */}
                                    {this.getNavigationBreadcrumbView(
                                        navigation
                                    )}

                                    {/*
                                        parent routes breadcrumb view
                                    */}
                                    {this.getParentRoutesBreadcrumbView(
                                        parentRoutes
                                    )}
                                </Space>
                            </Col>
                            <Col>
                                <Space size={10} className={'hide md-show-flex'}>
                                    {actions.map((action: any) => action)}
                                </Space>
                                {
                                    actions.length === 1 ? <Space className={'md-hide'}>
                                            {actions.map((action: any) => action)}
                                        </Space> :
                                        <div>
                                            <Popover className={'md-hide'} content={actions} trigger="click"
                                                     placement="bottomLeft">
                                                <Button type="default" shape="circle" icon={<MenuOutlined/>}/>
                                            </Popover>
                                        </div>
                                }

                            </Col>
                        </Row>
                    </div>
                    <Divider style={{margin: 0}}/>
                </div>

                <MainWrapperUi
                    style={{paddingTop: 20}}
                    maxWidth={wideScreen ? 1680 : maxWidth}
                >
                    {children}
                </MainWrapperUi>
            </div>
        );
    }
}

export default BarPageUi;
