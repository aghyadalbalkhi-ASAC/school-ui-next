import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Avatar, Col, Row,message } from 'antd';
import Image from 'next/image'
import { EditOutlined, DeleteOutlined,CheckCircleTwoTone } from '@ant-design/icons';
import StudentImage from '../../public/Education_Student.jpg';
import {Drawer, Form, Input,Button} from 'antd';
import { useRouter } from 'next/router'

import {getALlStudents} from './StudentsModel'

const { Meta } = Card;


const showDeleteMoadel = ()=>{
    message.success("showDeleteMoadel",3)

}


const StudentElement = ({ StudentsEle,SetShowDrawer,SetIsUpdate,SetselectedStudent }) => {
    return (
 
        <Col span={8}>
            <Card key={StudentsEle.StudentID}
                style={{ width: 300 }}
                cover={
                    <Image src={StudentImage} alt="Picture of the author" />
                }
                actions={[
                    <EditOutlined key="edit" onClick={() =>{
                        SetShowDrawer(true)
                        SetIsUpdate(true)
                        SetselectedStudent(StudentsEle)
                    }} />,
                    <DeleteOutlined key="Delete" onClick={showDeleteMoadel}  />,
                ]}
            >
                <Meta
                    avatar={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                    title={StudentsEle.StudentFullName}
                    description="This is the description"
                />
            </Card>
        </Col>
    )

}

function StudentsUi(props) {
    const router = useRouter()
    // const classid =router.query.classid
    // const schoolId =router.query.id
    const [showDrawer,SetShowDrawer]=useState(false)
    const [isUpdate,SetIsUpdate]=useState(false)
    const [selectedStudent,SetselectedStudent]=useState(null)

    useEffect(async () => {
      const result = await props.getALlStudents()
  }, []);

    return (
        <>
        <h1>Hello Students</h1>
            <Row gutter={100}>
                {/* {students && props.schools.schools ?
                    students.map(student => {
                        return <StudentElement
                                    StudentsEle={student}
                                    SetShowDrawer={SetShowDrawer}
                                    SetIsUpdate = {SetIsUpdate}
                                    SetselectedStudent={SetselectedStudent}
                                    />
                    }) : <h1> Loading .....</h1>
                } */}
            </Row>
            <FormDrawer
                showDrawer={showDrawer}
                SetShowDrawer={SetShowDrawer}
                isUpdate = {isUpdate}
                selectedStudent={selectedStudent}
                />

        </>
    )
}

const FormDrawer = (props)=>{
    const [form] = Form.useForm();
    const width = "40%"

        const onSubmit = (values) => {
            console.log("submit");
        };
        

        const onClose = () => {
            SetShowDrawer(false)
        };


        const onFinishFailed = ({ errorFields }) => {
            form.scrollToField(errorFields[0].name);
        };
        const {isUpdate,selectedStudent,showDrawer,SetShowDrawer} = props;
        useEffect(() => {
            if (isUpdate) {
                form.setFieldsValue(selectedStudent);
            } else {
                form.resetFields();
            }
        }, [selectedStudent,isUpdate,showDrawer]);
    return (
        <>
        <Drawer
          title="Create a new account"
          width={400}
          onClose={onClose}
          visible={showDrawer}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'left'
              }}
            >
              <Button onClick={onSubmit} type="primary">
                Submit
              </Button>

              <Button onClick={onClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
            </div>
          }
        >
          <Form
            layout="vertical"
            hideRequiredMark
            initialValues={selectedStudent}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="StudentName"
                  label="Student Name"
                  rules={[
                    { required: true, message: 'Please Enter Student Name' }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={12}>
              <Form.Item
                  name="CreatedBy"
                  label="Created By"
                  rules={[
                    { required: true, message: 'Please enter Created By' }
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Drawer>
        </>
    )

}



const mapStateToProps = (state) => ({
    schools: state.schools,
});

const mapDispatchToProps = (dispatch,schoolId) => ({
  getALlStudents: () => getALlStudents(dispatch,schoolId)


});
export default connect(mapStateToProps, mapDispatchToProps)(StudentsUi)
