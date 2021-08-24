import React ,{useEffect,useState}from 'react'
import FormDrawer from '../../__common/FormDrawer'
import { Col, Row ,message} from 'antd';
import { Form, Input,Select} from 'antd';
import { fetchCreateData ,createClass} from '../ClassesModel'


function ManageForm({showDrawer,data,SetShowDrawer,schoolId,refresher}) {

  const [createData,SetcreateData] = useState(null)
  const [selectedClass,SetSelectedClass] = useState(null)

  useEffect(async () => {
    const result = await fetchCreateData()
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

    const onClose =()=>{
        SetShowDrawer(false)
    }

    const onSubmitHandler =(values)=>{
      let payload = {...values,schoolId:schoolId}
      console.log(payload);
      createClass(payload).then(res=>{
        if(res?.ok){
          message.error(res.error)
        }else{
          refresher()
          message.success("Class Created")
          SetShowDrawer(false)
        }
      })
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
                          <Row>
                  {
                   
                      createData?.length > 0 &&
                          <Col span={24}>
                              <Form.Item name={'selectedClass'}
                                          label={'Selecte School'} rules={[{required: true}]}>
                                  <Select showSearch optionFilterProp="children"
                                          onSelect={(value,obj) => {
                                            localStorage.setItem('ClassID', value);
                                            SetSelectedClass(value)
                                            
                                          }}>
                                      {
                                          createData.map(
                                              (obj, index) => {
                                            
                                                return (
                                                      <Select.Option
                                                          key={index}
                                                          value={obj.ClassID}
                                                          >
                                                          {obj.ClassName}
                                                      </Select.Option>)
                                              }
                                          )
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                  }
              </Row>
        </FormDrawer>
    )
}

export default ManageForm
