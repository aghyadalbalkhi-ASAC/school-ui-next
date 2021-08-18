import React from "react";
import {Button, Dropdown, Menu} from "antd";
import {
    EllipsisOutlined
} from '@ant-design/icons';
import { goToLink } from "../../services/authService";
import {useTranslation} from "react-i18next";

const CreateJobDropdown = (props: any) => {
    const { t } = useTranslation('common');
    return <>
        <Dropdown.Button type={'primary'} className={'hide sm-show'} icon={<EllipsisOutlined />} onClick={() => {
            goToLink(`/business/${props.businessId}/new-job`);
        }} overlay={
            <Menu>
                <Menu.Item key="1" onClick={(e) => {
                    goToLink(`/business/${props.businessId}/new-bulk-jobs`);
                }}>{t('Create Bulk Jobs')}</Menu.Item>
            </Menu>}>{t('Create Job')}</Dropdown.Button>

        <Button type={'primary'} className={'sm-hide'} onClick={() => {
            goToLink(`/business/${props.businessId}/new-job`);
        }}>{t('Create Job')}</Button>
    </>;
};

export default CreateJobDropdown;
