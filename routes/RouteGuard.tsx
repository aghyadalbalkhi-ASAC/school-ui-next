import {RouterGuard} from 'react-router-guard';
import React from "react";
import config from "./config";
import {Row, Col} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

const CustomLoading = () => {
    return <Row justify={'center'} style={{marginTop: 120}}>
        <Col>
            <LoadingOutlined style={{fontSize: '26px'}}/>
        </Col>
    </Row>;
};

const RouteGuard = () => {
    return <RouterGuard config={config} loading={CustomLoading()}/>
};

export default RouteGuard;
