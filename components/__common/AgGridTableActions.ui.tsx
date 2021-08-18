import React from 'react';
import {Button, Dropdown, Menu} from 'antd';
import {ButtonType} from 'antd/lib/button';
import {SizeType} from 'antd/lib/config-provider/SizeContext';
import {SettingOutlined} from '@ant-design/icons';

export interface ActionMenuItem {
    key: string;
    icon?: React.ReactNode;
    title: string;
    onClick?: (info: any) => void;
    hasPermission: boolean; // to decide whether to show the item or not
    dividerTop?: boolean;
    disabled?: boolean;
    dividerBottom?: boolean;
    subMenuItems?: ActionMenuItem[]
}

export type ActionsMenuItems = ActionMenuItem[];

interface Props {
    actionsMenuItems?: ActionsMenuItems;
    title?: string;
    type?: ButtonType;
    size?: SizeType;
    icon?: React.ReactNode;
}

const AgGridTableActions: React.FC<Props> = ({
                                                 actionsMenuItems = [],
                                                 type = 'default',
                                                 size = 'middle',
                                                 icon = <SettingOutlined/>,
                                                 title = 'Manage'
                                             }) => {
    const getMenu = () => {

        const getMenuItem = (obj: ActionMenuItem) => {
            const {dividerTop, key, disabled, icon, onClick, dividerBottom, subMenuItems, title} = obj;
            return <>
                {dividerTop && <Menu.Divider/>}
                {
                    subMenuItems && subMenuItems.length ?
                        <Menu.SubMenu
                            key={key}
                            title={title}
                            disabled={disabled}
                            icon={icon}
                        >
                            {
                                subMenuItems.filter(
                                    (item) => item.hasPermission
                                ).map((obj: ActionMenuItem) => {
                                    return getMenuItem(obj);
                                })
                            }
                        </Menu.SubMenu> :

                        <Menu.Item
                            key={key}
                            disabled={disabled}
                            icon={icon}
                            onClick={onClick}
                        >
                            {title}
                        </Menu.Item>
                }

                {dividerBottom && <Menu.Divider/>}
            </>;
        }
        return <Menu>
            {
                actionsMenuItems.filter(
                    (item) => item.hasPermission
                ).map((obj: ActionMenuItem) => {
                    return getMenuItem(obj);
                })
            }
        </Menu>;
    }

    return (
        <Dropdown
            overlay={getMenu()}
            trigger={['click']}
        >
            <Button type={type} size={size} icon={icon}>
                {title}
            </Button>
        </Dropdown>
    );
};

export default AgGridTableActions;
