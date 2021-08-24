import React, { useEffect, useState } from 'react';
import { Drawer, Form, Input, Button } from 'antd';

const FormDrawer = ({ isEdit, children, data, title, onClose, visible, onSubmit, form ,formId}) => {

  useEffect(() => {
    if (isEdit) {
      form.setFieldsValue(data)
    } else {
      form.resetFields();
    }
  }, [form, data])

  return (
    <>
      <Drawer
        title={title}
        width={400}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: 'left'
            }}
          >
            <Button form={formId} htmlType="submit" type="primary">
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
          initialValues={data}
          id={formId}
          form={form}
          onFinish={onSubmit}
        >
          {children}
          
        </Form>
      </Drawer>
    </>
  )

}

export default FormDrawer