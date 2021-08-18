import React from 'react';
import {
    StopOutlined,
    UserAddOutlined,
} from '@ant-design/icons';
import {
    isAdminUser
} from '../../services/authService';
import AgGridTableActions, {ActionsMenuItems} from './AgGridTableActions.ui';
import {useTranslation} from "react-i18next";

const JobsActionsUi = (props: any) => {
    const isAdmin = isAdminUser();
    const {t} = useTranslation('job_info');

    const menuItems: ActionsMenuItems = [
        {
            key: 'assign-job',
            title: t('Assign Jobs'),
            hasPermission: isAdmin,
            disabled: !props.data?.filter((job: any) => ['CANCELED', 'COMPLETED'].indexOf(job.status) === -1).length,
            icon: <UserAddOutlined/>,
            onClick: () => {
                props.onAssignAction(props.data, true);
            }
        },
        {
            key: 'cancel-job',
            title: t('Cancel Jobs'),
            hasPermission: true,
            disabled: !props.data?.filter((job: any) => ['CANCELED', 'COMPLETED'].indexOf(job.status) === -1).length,
            icon: <StopOutlined/>,
            onClick: () => {
                props.preCancelJob(props.data, true);
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

export default JobsActionsUi;
