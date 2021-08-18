import { registerUser } from '../../services/usersFunctionlity'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../../styles/login.module.css'
import { Form, Input, Button, message, Row, Col, Card } from 'antd';


function register() {

    const router = useRouter()
    const onFinish = async ({ email, password }) => {
        const is_register = await registerUser(email, password);

        if (is_register?.ok) {
            message.error(is_register.error + ``);
        } else {
            router.push("/auth/login")
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Row className={styles.bgimage} align={'stretch'} justify={'center'} style={{ height: '100%' }}>
            <Col span={24} id={styles.loginpagecontainer}>
                <div style={{ marginTop: "15%", width: '100%' }} id={'login-content-wrapper'}>
                    <Card style={{ width: '40%', float: 'right' }} bordered={false}>
                        <Form style={{ paddingRight: "15%", paddingTop: '10%' }}
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
                                label="Username"
                                name="username"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Username!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

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

export default register
