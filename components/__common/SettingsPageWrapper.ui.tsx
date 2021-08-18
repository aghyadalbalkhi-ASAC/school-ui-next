import React from 'react';
import BarPageUi from './BarPage.ui';

const SettingsPageWrapper = (props: any) => {
    let navigation: any;

    const allNavigation = [{link: `/banks`, label: 'Banks'}];
    const navigationLength = props.navigationLength || 4;
    navigation = [
        ...allNavigation.slice(0, navigationLength - 1),
        {
            label: 'More',
            children: [...allNavigation.slice(navigationLength - 1)]
        }
    ];
    return (
        <BarPageUi
            pageTitle={props.title}
            actions={props.actions}
            currentNav={props.currentNav}
            navigation={navigation}
            wideScreen
            maxWidth="100%"
        >
            {props.children}
        </BarPageUi>
    );
};

export default SettingsPageWrapper;
