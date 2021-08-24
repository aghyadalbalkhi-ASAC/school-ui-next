import React, { useEffect, useState } from 'react';
import { Card, Col, Row, message } from 'antd';
import Image from 'next/image'
import { EditOutlined, DeleteOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import ClassImage from '../../public/classroom.png';
import { Drawer, Form, Input, Button } from 'antd';
import Link from 'next/link'
import { useRouter } from 'next/router'
import { connect } from 'react-redux';
import FormDrawer from '../__common/FormDrawer'
import ManageForm from './partials/ManageForm';
import { getALlClasses,deleteClass } from './ClassesModel'

const { Meta } = Card;

const showDeleteMoadel = (SchoolClassEn,refresher) => {

  deleteClass(SchoolClassEn).then(res=>{
    refresher()
    message.success("Class Deleted", 3)
}).catch(e=>{
    message.error(e, 3)
})

}


const ClassElement = ({ ClassEle, id ,refresher,SchoolClassEn}) => {
  const router = useRouter()
  const schoolId = router.query.id
  const classid = id

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
          <DeleteOutlined key="Delete" onClick={()=>showDeleteMoadel(SchoolClassEn,refresher)} />,
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
  const router = useRouter()
  const [showDrawer, SetShowDrawer] = useState(false)
  const [isUpdate, SetIsUpdate] = useState(false)
  const [selectedClass, SetselectedClass] = useState(null)
  const schoolId = router.query.id

  useEffect(async () => {
    const result = await props.getALlClasses()
  }, []);

  const CreateNewClass = async ()=>{
    SetShowDrawer(true)
}


  const refresher = async()=>{
    router.reload(window.location.pathname)
    // router.push(router.asPath)
}

  return (
    <>
      <Row >
        <Col className="gutter-row" offset={21}>
          <Button onClick={()=>{CreateNewClass()}} type="primary">Add Class</Button>
        </Col>
      </Row>
      <Row>
        <br></br>
      </Row>
      <Row gutter={100}>
        {props.classes ?
          (props.classes).map((ClassEle) => {
            return <ClassElement
              ClassEle={ClassEle.classes}
              id={ClassEle.id}
              SetShowDrawer={SetShowDrawer}
              SetIsUpdate={SetIsUpdate}
              SetselectedClass={SetselectedClass}
              SchoolClassEn={ClassEle.id}
              refresher={refresher}
            />
          }) : <h1> Loading .....</h1>
        }
      </Row>
      <ManageForm
        showDrawer={showDrawer}
        SetShowDrawer={SetShowDrawer}
        data={selectedClass}
        refresher={refresher}
        schoolId={schoolId}
        
      />

    </>
  )
}

export async function getServerSideProps(context) {
  const schoolId = context.query.id;
  return { props: { schoolId: schoolId } }
}

const mapStateToProps = state => ({
  classes: state.classes.classes,
});

const mapDispatchToProps = (dispatch, schoolId) => ({
  getALlClasses: () => getALlClasses(dispatch, schoolId)
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassesUi)

