import React from 'react'
import { Form, Input, Button, message,Row,Col,Card } from 'antd';
import { loginUser } from '../../services/usersFunctionlity'
import styles from '../../styles/login.module.css'
import { useRouter } from 'next/router'

function login() {

    const router = useRouter()
    const onFinish = async ({ email, password }) => {
        const is_logged = await loginUser(email, password).then(res=>{
        if (res?.ok) {
            message.error(res.error + ``);
        }else{
            router.push("/schools")
        }
    
    });

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <Row className={styles.bgimage} align={'stretch'} justify={'center'} style={{ height: '100%' }}>
            <Col span={24} id={styles.loginpagecontainer}>
                <div style={{marginTop:"15%" , width: '100%'}} id={'login-content-wrapper'}>
                        <Card style={{ width: '40%',float: 'right'}}  bordered={false}>
                            <Form style={{paddingRight:"15%" , paddingTop:'10%'}}
                                name="basic"
                                labelCol={{
                                    span: 8,
                                }}
                                wrapperCol={{
                                    span: 16,
                                }}
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                            >
                                <Form.Item
                                    label="Email"
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Email!',
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>

                                <Form.Item
                                    label="Password"
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input.Password />
                                </Form.Item>

                                <Form.Item
                                    wrapperCol={{
                                        offset: 8,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
            </Col>
        </Row>
    )
}

export default login
