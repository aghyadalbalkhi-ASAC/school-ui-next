import React from "react";
import BarPageUi from "./BarPage.ui";
import {
    LeftOutlined
} from "@ant-design/icons";
import {isEmployeeUser} from "../../services/authService";
import {useTranslation} from "react-i18next";

const EmployeePageWrapper = (props: any) => {
    let navigation: any;
    const {t} = useTranslation(['employee_profile', 'glossary']);
    if(props.employee && props.employee.id) {
        const allNavigation = [
            {link: '/employees', label: t('common:Home'), icon: <LeftOutlined/>},
            {link: `/employee/${props.employee.id}/profile`, label: t('Profile')},
            {link: `/employee/${props.employee.id}/jobs`, label: t('glossary:Jobs')},
            {link: `/employee/${props.employee.id}/wallet`, label: t('glossary:Wallet')},
        ]
        const navigationLength = props.navigationLength || 4
        navigation = [
             ...allNavigation.slice(0, navigationLength - 1),
            {
                label: t('common:More'), children: [
                    ...allNavigation.slice(navigationLength - 1),
                ]
            },
        ];
    }

    if(navigation && navigation.length && isEmployeeUser()){
        navigation[1]['icon'] = <LeftOutlined/>;
        navigation.splice(0, 1);
    }
    return <BarPageUi pageTitle={props.title}
                      pageSubTitle={props.pageSubTitle}
                      actions={props.actions}
                      wideScreen={props.wideScreen || false}
                      currentNav={props.currentNav}
                      navigation={navigation}>
        {props.children}
    </BarPageUi>;
};

export default EmployeePageWrapper;
