import React, { useEffect,useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Avatar, Col, Row,message } from 'antd';
import Image from 'next/image'
import { EditOutlined, DeleteOutlined,CheckCircleTwoTone } from '@ant-design/icons';
import schoolImage from '../../public/school.png';
import {Drawer, Form, Input,Button} from 'antd';
import Link from 'next/link'

import { SCHOOLS_LOADED } from './School.actions'
const { Meta } = Card;





const showDeleteMoadel = ()=>{
    message.success("showDeleteMoadel",3)

}


const SchoolElement = ({ school,selectSchoolDrwaer }) => {

  const OnSchool =()=>{

  }
    return (
        <Col span={8}>
            <Card key={school.SchoolID}
                style={{ width: 300 }}
                cover={
                  <Link href={`/schools/${school.SchoolID}/classes/`}>
                    <Image src={schoolImage} alt="Picture of the author" />
                  </Link>
                }
                actions={[
                  <EditOutlined key="edit" onClick={() =>{
                    selectSchoolDrwaer(school)
                    }} />,
                    <DeleteOutlined key="Delete" onClick={showDeleteMoadel}  />,
                ]}
            >
                <Meta
                    avatar={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                    title={school.SchoolName}
                    description="This is the description"
                />
            </Card>
        </Col>
    )

}

function SchoolUi(props) {
    const [showDrawer,SetShowDrawer]=useState(false)
    const [isUpdate,SetIsUpdate]=useState(false)
    const [selectedSchool,SetselectedSchool]=useState(null)

    useEffect(async () => {
        const result = await props.fetchSchools()
    }, []);

    
    const selectSchoolDrwaer = (school) =>{
      console.log(school,"school");
      SetselectedSchool(school)
      SetShowDrawer(true)
      SetIsUpdate(true)
    }
    return (
        <>
            <Row gutter={16}>
                {props.schools.schools ?
                    props.schools.schools.map(school => {
                        return <SchoolElement
                                    school={school}
                                    selectSchoolDrwaer={selectSchoolDrwaer}
                                    />
                    }) : <h1> Loading .....</h1>
                }
            </Row>
            <FormDrawer
                showDrawer={showDrawer}
                SetShowDrawer={SetShowDrawer}
                isUpdate = {isUpdate}
                SetIsUpdate={SetIsUpdate}
                selectedSchool={selectedSchool}
                SetselectedSchool={SetselectedSchool}
                />

        </>
    )
}

const FormDrawer = (props)=>{
  const {isUpdate,selectedSchool,showDrawer,SetShowDrawer,SetIsUpdate,SetselectedSchool} = props;

    const [form] = Form.useForm();
    const width = "40%"
    const [initdata] =useState(null)
    // const onSubmitHandler = (values)=>{
        //     console.log("submit");
        //     SchoolModel.onUpdateSchoolAction();
        // }
        
        const onSubmit = (values) => {
            console.log("submit");
            // SchoolModel.onUpdateSchoolAction();
        };
        

        const onClose = () => {
          form.resetFields();
            SetShowDrawer(false)
            SetIsUpdate(false)
        };


        const onFinishFailed = ({ errorFields }) => {
            form.scrollToField(errorFields[0].name);
        };

        useEffect(() => {
          console.log(selectedSchool,"selectedSchool");

        }, [selectedSchool]);
        
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
            // initialValues={selectedSchool}
          >
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  name="SchoolName"
                  label="School Name"
                  initialValue={selectedSchool?.SchoolName || ''}
                  rules={[
                    { required: true, message: 'Please Enter School Name' }
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
                  initialValue={selectedSchool?.CreatedBy || ''}
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

async function getProductsFromDatabase(dispatch) {
  const url = `http://[::1]:3000/schools?filter={%22include%22:[{%22relation%22:%22classEnrollmentRelationals%22,%22scope%22:{%22include%22:[{%22relation%22:%22students%22},{%22relation%22:%22classes%22}]}}]}`

    const pay = await axios.get(url).then(res => {
        dispatch({
            type: SCHOOLS_LOADED,
            payload: res.data
        })
    })

}

const mapStateToProps = state => ({
    schools: state.schools,
});

const mapDispatchToProps = (dispatch) => ({
    fetchSchools: () => getProductsFromDatabase(dispatch)

});
export default connect(mapStateToProps, mapDispatchToProps)(SchoolUi)
