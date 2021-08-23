import React, { useEffect,useState } from 'react';
import { Card, Col, Row,message } from 'antd';
import Image from 'next/image'
import { EditOutlined, DeleteOutlined,CheckCircleTwoTone } from '@ant-design/icons';
import ClassImage from '../../public/classroom.png';
import {Drawer, Form, Input,Button} from 'antd';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { connect } from 'react-redux';

import {getALlClasses} from './ClassesModel'

const { Meta } = Card;

const showDeleteMoadel = ()=>{
    message.success("showDeleteMoadel",3)

}


const ClassElement = ({ ClassEle,SetShowDrawer,SetIsUpdate,SetselectedClass ,id}) => {
  const router = useRouter()
  const schoolId =router.query.id
  const classid =id
    return (
        <Col span={8}>
            <Card key={ClassEle.ClassID}
                style={{ width: 300 }}
                cover={
                  <Link href={`/schools/${schoolId}/classes/${classid}`}>
                    <Image src={ClassImage} alt="Picture of the author" />
                  </Link>
                }
                actions={[
                    <EditOutlined key="edit" onClick={() =>{
                        SetShowDrawer(true)
                        SetIsUpdate(true)
                        SetselectedClass(ClassEle)
                    }} />,
                    <DeleteOutlined key="Delete" onClick={showDeleteMoadel}  />,
                ]}
            >
                <Meta
                    avatar={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                    title={ClassEle.ClassName}
                    description="This is the description"
                />
            </Card>
        </Col>
    )

}

function ClassesUi(props) {
  console.log(props,"props");
    const [showDrawer,SetShowDrawer]=useState(false)
    const [isUpdate,SetIsUpdate]=useState(false)
    const [selectedClass,SetselectedClass]=useState(null)

    useEffect(async () => {
      const result = await props.getALlClasses()
  }, []);
  console.log(props.classes,"props.classes");

    return (
        <>
            <Row gutter={100}>
                {props.classes ?
                    (props.classes).map((ClassEle,index) => {
                        return <ClassElement
                                    ClassEle={ClassEle.classes}
                                    id={index}
                                    SetShowDrawer={SetShowDrawer}
                                    SetIsUpdate = {SetIsUpdate}
                                    SetselectedClass={SetselectedClass}
                                    />
                    }) : <h1> Loading .....</h1>
                }
            </Row>
            <FormDrawer
                showDrawer={showDrawer}
                SetShowDrawer={SetShowDrawer}
                isUpdate = {isUpdate}
                selectedClass={selectedClass}
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
        const {isUpdate,selectedClass,showDrawer,SetShowDrawer} = props;
        useEffect(() => {
            if (isUpdate) {
                form.setFieldsValue(selectedClass);
            } else {
                form.resetFields();
            }
        }, [selectedClass,isUpdate,showDrawer]);
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
            initialValues={selectedClass}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="ClassName"
                  label="Class Name"
                  rules={[
                    { required: true, message: 'Please Enter Class Name' }
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

export async function getServerSideProps(context){
  const schoolId = context.query.id;
  return {props: {schoolId: schoolId}}
}

const mapStateToProps = state => ({
  classes: state.classes.classes,
});

const mapDispatchToProps = (dispatch,schoolId) => ({
  getALlClasses: () => getALlClasses(dispatch,schoolId)
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesUi)

