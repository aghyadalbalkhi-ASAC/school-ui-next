import React ,{useEffect}from 'react'
import FormDrawer from '../../__common/FormDrawer'
import { Col, Row } from 'antd';
import { Form, Input,message} from 'antd';
import {createSchool,updateSchool} from '../SchoolModel'

function ManageForm({showDrawer,data,SetShowDrawer,SetIsUpdate,refresher}) {

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
    const isCreate = !data?.SchoolID;
    const isEdit = !!data?.SchoolID;

    const onClose =()=>{
        SetShowDrawer(false)
        SetIsUpdate(false)
    }

    const onSubmitHandler =(values)=>{
      console.log(values,"created");
        if(isCreate){
          createSchool(values).then(res=>{
            if(res?.ok){
              message.error(res.error)
            }else{
              refresher()
              message.success("Class Created")
              SetShowDrawer(false)
            }
          })
        }else if (isEdit){
          updateSchool({...values,SchoolID:data.SchoolID}).then(res=>{
            if(res?.ok){
              message.error(res.error)
            }else{
              refresher()
              message.success("Class Created")
              SetShowDrawer(false)
            }
          })

        }
    }

    const title = isEdit? "Edit" : "Create";
    
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
                  <Form.Item
                    name="SchoolName"
                    label="School Name"
                    initialValue={data?.SchoolName || ''}
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
