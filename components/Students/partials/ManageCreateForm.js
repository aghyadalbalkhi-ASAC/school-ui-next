import React ,{useEffect,useState}from 'react'
import FormDrawer from '../../__common/FormDrawer'
import { Col, Row,message } from 'antd';
import { Form, Input,Select,Skeleton} from 'antd';
import { fetchCreateData,createStudent } from '../StudentsModel'


function ManageCreateForm({showDrawer,data,SetShowDrawer,refresher}) {

  const [createData,SetcreateData] = useState(null)
  const [selectedSchool,SetSelectedSchool] = useState(null)
  // const [loadingJobCategories,SetJobCategories] = useState(false) 
  

  useEffect(async () => {
    const result = await fetchCreateData()
    console.log("fd");
      SetcreateData(result)
}, []);

useEffect(async () => {
  // SetJobCategories(true)
  // console.log(loadingJobCategories);
}, [createData]);


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
        createStudent(values).then(res=>{
          if(res?.ok){
            message.error(res.error)
          }else{
            message.success("Student Created")
            SetShowDrawer(false)
            refresher()
          }
        })
        
    }

    const title = "Create";

    const LoadingInput = <Skeleton.Button active={true} style={{width: '170px', marginBottom: '17px', marginTop: '30px'}}/>;
    let classesSelect =[];
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

              <Row>
                  {
                    // !loadingJobCategories ?LoadingInput :
                      createData?.schools?.length > 0 &&
                          <Col span={24}>
                              <Form.Item name={'selectedschool'}
                                          label={'Selecte School'} rules={[{required: true}]}>
                                  <Select showSearch optionFilterProp="children"
                                          onSelect={(value,obj) => {
                                            localStorage.setItem('SchoolID', value);
                                            SetSelectedSchool(createData.schools[value])
                                            
                                          }}>
                                      {
                                          createData.schools.map(
                                              (obj, index) => {
                                                classesSelect.push(obj.classEnrollmentRelationals);
                                                return (
                                                      <Select.Option
                                                          key={index}
                                                          value={obj.SchoolID}
                                                          >
                                                          {obj.SchoolName}
                                                      </Select.Option>)
                                              }
                                          )
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                  }
              </Row>

              <Row>
                  {
                    // !loadingJobCategories ?LoadingInput :
                      createData?.schools?.length > 0 &&
                          <Col span={24}>
                              <Form.Item name={'selectedclass'}
                                          label={'Selecte Class'} rules={[{required: true}]}>
                                  <Select showSearch optionFilterProp="children"
                                          onSelect={(value,obj) => {
                                              
                                            // SetSelectedSchool(createData.schools[obj.SchoolID])
                                            
                                          }}>

                                            
                                      {
                                       classesSelect.map( ele =>{
                                            return ele.map(
                                              (obj, index) =>{
                                                if (obj.SchoolID == JSON.parse(localStorage.getItem('SchoolID'))){
                                                return (<Select.Option key={index}
                                                                              value={obj.id}>
                                                  {obj.classes?.ClassName}
                                              </Select.Option>)
                                              }
                                              }
                                          )
                                        })
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                  }
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

export default ManageCreateForm
