import React from 'react';
import {
    StopOutlined,
    EditOutlined,
    UnorderedListOutlined,
    UserAddOutlined,
    PaperClipOutlined,
    GlobalOutlined,
    FileOutlined
} from '@ant-design/icons';
import {
    goToLink,
    isAdminUser,
    isEmployeeUser
} from '../../services/authService';
import AgGridTableActions, {ActionsMenuItems} from './AgGridTableActions.ui';
import {useTranslation} from "react-i18next";

const JobActionsUi = (props: any) => {
    const isAdmin = isAdminUser();
    const isEmployee = isEmployeeUser();
    const {t} = useTranslation('job_info');

    const menuItems: ActionsMenuItems = [
        {
            key: 'edit-job',
            title: t('Edit Job'),
            icon: <EditOutlined/>,
            hasPermission: !isEmployee,
            disabled: ['CANCELED', 'COMPLETED'].indexOf(props.data?.status) !== -1,
            onClick: () => {
                goToLink(
                    `/business/${props.data.business_id}/job/${props.data.tracking_id}`
                );
            }
        },
        {
            key: 'assign-job',
            title: t('Assign Job'),
            hasPermission: isAdmin,
            disabled: ['CANCELED', 'COMPLETED'].indexOf(props.data?.status) !== -1,
            icon: <UserAddOutlined/>,
            onClick: props.onAssignAction
        },
        {
            key: 'job-adjustment',
            title: t('Adjustments'),
            hasPermission: isAdmin,
            icon: <UnorderedListOutlined/>,
            onClick: () =>
                goToLink(
                    `/business/${props.data.business_id}/job/${props.data.id}/adjustments`
                )
        },
        {
            key: 'job-attendance',
            title: t('Job Attendance'),
            hasPermission: isAdmin,
            icon: <UnorderedListOutlined/>,
            onClick: () =>
                goToLink(
                    `/business/${props.data.business_id}/job/${props.data.id}/attendance`
                )
        },
        {
            key: 'cancel-job',
            title: t('Cancel Job'),
            hasPermission: true,
            disabled: ['CANCELED', 'COMPLETED'].indexOf(props.data?.status) !== -1,
            icon: <StopOutlined/>,
            onClick: () => {
                props.preCancelJob();
            },
            dividerTop: true
        }
    ];
    return (
        <AgGridTableActions
            actionsMenuItems={menuItems}
            title={props.title}
            type={props.type}
            size={props.size}
            icon={props.icon}
        />
    );
};

export default JobActionsUi;
