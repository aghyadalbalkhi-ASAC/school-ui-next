import React, {Component} from 'react';
import {ExclamationCircleOutlined} from '@ant-design/icons';
import {history} from 'react-router-guard';
import {Button, Col, Drawer, Form, Modal, Row, Space} from 'antd';

class FormDrawerUi extends Component{
    deleteConfirm = () => {
        const {
            closeCallback,
            deleteAction: {action, message, callbackRoute},
            initValues: {id}
        } = this.props;
        Modal.confirm({
            title: message,
            icon: <ExclamationCircleOutlined/>,
            onOk: async () => {
                const result = await action(id);
                closeCallback(result);
                // goToLink(callbackRoute);
            },
            onCancel() {
            }
        });
    };

    ID = () => {
        const key = '_' + Math.random().toString(36).substr(2, 9);
        if (this.props.onFormKey) {
            this.props.onFormKey(key)
        }
        return key;
    };

    autoFocusRef= React.createRef();

    state= {
        visible: true
    };

    showDrawer = () => {
        this.setState({
            visible: true
        });
    };

    setFocus = (isOpen) => {
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
            children,
            formId,
            formRef,
            formKey,
            saving = false,
            onSubmit,
            show = false,
            forceTitle = false,
            headerTitle,
            closeCallback,
            width = 720,
            noBottomActions = true,
            form,
            hasDeleteAction = true
        }= this.props;


        let {initValues = null}= this.props;

        if (!initValues) {
            initValues = {};
        }

        let title;
        if (initValues.id) {
            title = 'Edit';
        } else {
            title = 'Add';
        }

        const validateMessages = {
            required: "'${label}' " + 'is required' + "!",
            // ...
        };

        title = forceTitle ? headerTitle : `${title} ${headerTitle}`;
        return (
            <Drawer
                title={title}
                // placement={i18n.dir() === 'ltr' ? 'right' : 'left'}
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
                                        {'Save'}
                                    </Button>
                                    <Button
                                        onClick={closeCallback}
                                        type={'link'}
                                        style={{marginRight: 8}}
                                    >
                                        {'Cancel'}
                                    </Button>
                                    {initValues.id && hasDeleteAction && (
                                        <Button
                                            onClick={this.deleteConfirm}
                                            type={'ghost'}
                                        >
                                            {'Delete'}
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

export default FormDrawerUi;
