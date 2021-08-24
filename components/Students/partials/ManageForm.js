import React ,{useEffect}from 'react'
import FormDrawer from '../../__common/FormDrawer'
import { Col, Row } from 'antd';
import { Form, Input} from 'antd';
import {updateStudent} from '../StudentsModel'


function ManageForm({showDrawer,data,SetShowDrawer,refresher}) {

    const ID = () => {
        // Math.random should be unique because of its seeding algorithm.
        // Convert it to base 36 (numbers + letters), and grab the first 9 characters
        // after the decimal.
        const key = '_' + Math.random().toString(36).substr(2, 9);
        // if (this.props.onFormKey) {
        //     this.props.onFormKey(key)
        // }
        return key;
    };
    const [form] = Form.useForm();
    const isCreate = !data?.id;
    const isEdit = !!data?.id;

    // useEffect(()=>{
    //     if(isEdit){
    //         form.setFieldsValue(data)
    //     }else{
    //         form.resetFields();
    //     }
    // },[form,data,showDrawer,isEdit])

    const onClose =()=>{
        SetShowDrawer(false)
    }

    const onSubmitHandler =(values)=>{
      updateStudent(values).then(res=>{
        if(res?.ok){
          message.error(res.error)
        }else{
          refresher()
          message.success("Student Updated")
          SetShowDrawer(false)
        }
      })
      
    }

    const title ="Edit";
    
    return (
        
        <FormDrawer
            title ={title}
            onClose={onClose}
            visible={showDrawer}
            data={data}
            onSubmit={onSubmitHandler}
            form={form}
            isEdit={isEdit}
            formId={ID()}

        >
            <Row gutter={16}>
                <Col span={12}>
                <Form.Item name={"StudentID"} hidden initialValue={data?.StudentID} >
                    <Input />
                </Form.Item>
                  <Form.Item
                    name="StudentFullName"
                    label="Student Name"
                    initialValue={data?.StudentFullName || ''}
                    rules={[
                      { required: true, message: 'Please Enter Student Full Name' }
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
                    initialValue={data?.CreatedBy || ''}
                    rules={[
                      { required: true, message: 'Please enter Created By' }
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
        </FormDrawer>
    )
}

export default ManageForm
