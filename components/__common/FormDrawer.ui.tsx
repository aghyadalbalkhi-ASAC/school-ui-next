import React, {Component} from 'react';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {history} from 'react-router-guard';
import {Button, Col, Drawer, Form, Modal, Row, Space} from 'antd';
import {withTranslation} from "react-i18next";
import {goToLink} from "../../services/authService";

class FormDrawerUi extends Component<any, any> {
    deleteConfirm = () => {
        const {
            closeCallback,
            deleteAction: {action, message, callbackRoute},
            initValues: {id}
        } = this.props;
        Modal.confirm({
            title: message,
            icon: <ExclamationCircleOutlined/>,
            // content: 'When clicked the OK button, this dialog will be closed after 1 second',
            onOk: async () => {
                const result = await action(id);
                closeCallback(result);
                goToLink(callbackRoute);
            },
            onCancel() {
            }
        });
    };

    ID = () => {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        const key = '_' + Math.random().toString(36).substr(2, 9);
        if (this.props.onFormKey) {
            this.props.onFormKey(key)
        }
        return key;
    };

    autoFocusRef: any = React.createRef();

    state: any = {
        visible: true
    };

    showDrawer = () => {
        this.setState({
            visible: true
        });
    };

    setFocus = (isOpen: boolean) => {
        // console.log("isOpen", isOpen);
        if (isOpen) {
            if (this.props.firstInputRef) {
                this.props.firstInputRef.current.focus();
            }

            if (this.props.onOpen) {
                this.props.onOpen();
            }
        }
    };

    render() {
        const {
            t,
            i18n,
            saving = false,
            children,
            formId,
            formRef,
            formKey,
            onSubmit,
            show = false,
            forceTitle = false,
            headerTitle,
            closeCallback,
            width = 720,
            noBottomActions = true,
            form,
            hasDeleteAction = true
        }: any = this.props;


        let {initValues = null}: any = this.props;

        if (!initValues) {
            initValues = {};
        }

        let title;
        if (initValues.id) {
            title = t('Edit');
        } else {
            title = t('Add');
        }

        const validateMessages = {
            required: "'${label}' " + t('is required') + "!",
            // ...
        };

        title = forceTitle ? headerTitle : `${title} ${headerTitle}`;
        return (
            <Drawer
                title={title}
                placement={i18n.dir() === 'ltr' ? 'right' : 'left'}
                width={width}
                style={{maxWidth: '100%'}}
                onClose={closeCallback}
                visible={show}
                bodyStyle={{paddingBottom: 80}}
                afterVisibleChange={this.setFocus}
                footer={
                    !noBottomActions && (
                        <Row justify={'space-between'} align={'middle'}>
                            <Col>
                                <Space size={10}>
                                    <Button
                                        form={formId}
                                        loading={saving}
                                        htmlType="submit"
                                        type="primary"
                                    >
                                        {t('Save')}
                                    </Button>
                                    <Button
                                        onClick={closeCallback}
                                        type={'link'}
                                        style={{marginRight: 8}}
                                    >
                                        {t('Cancel')}
                                    </Button>
                                    {initValues.id && hasDeleteAction && (
                                        <Button
                                            onClick={this.deleteConfirm}
                                            type={'ghost'}
                                        >
                                            {t('Delete')}
                                        </Button>
                                    )}
                                </Space>
                            </Col>

                        </Row>
                    )
                }
            >
                <Form
                    key={formKey || this.ID()}
                    layout="vertical"
                    id={formId}
                    ref={formRef}
                    onFinish={onSubmit}
                    validateMessages={validateMessages}
                    initialValues={initValues}
                    form={form}
                >
                    {children}
                </Form>
            </Drawer>
        );
    }
}

export default withTranslation('common')(FormDrawerUi);
