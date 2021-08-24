import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Card, Button, Col, Row, message } from 'antd';
import Image from 'next/image'
import { EditOutlined, DeleteOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import StudentImage from '../../public/Education_Student.jpg';
import { useRouter } from 'next/router'
import FormDrawer from '../__common/FormDrawer';
import { Empty } from 'antd';
import ManageForm from './partials/ManageForm';
import ManageCreateForm from './partials/ManageCreateForm'

import GridExample from './partials/StudentTable'
import { getALlStudents,fetchCreateData,deleteStudent } from './StudentsModel'

const { Meta } = Card;


const showDeleteMoadel = (StudentsEle,refresher) => {
    deleteStudent(StudentsEle.StudentID).then(res=>{
        refresher()
        message.success("Student Deleted", 3)
    }).catch(e=>{
        message.error(e, 3)
    })
    

}


const StudentElement = ({ StudentsEle, SetShowDrawer, SetIsUpdate, SetselectedStudent,refresher }) => {
    return (

        <Col span={8} style={{marginBottom:"1%"}}>
            <Card key={StudentsEle.StudentID}
                style={{ width: 300 }}
                cover={
                    <Image src={StudentImage} alt="Picture of the author" />
                }
                actions={[
                    <EditOutlined key="edit" onClick={() => {
                        SetShowDrawer(true)
                        SetIsUpdate(true)
                        SetselectedStudent(StudentsEle)
                    }} />,
                    <DeleteOutlined key="Delete" onClick={()=>showDeleteMoadel(StudentsEle,refresher)} />,
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
    const [showDrawer, SetShowDrawer] = useState(false)
    const [showCreateDrawer, SetShowCreateDrawer] = useState(false)
    const [isUpdate, SetIsUpdate] = useState(false)
    const [selectedStudent, SetselectedStudent] = useState(null)

    useEffect(async () => {
        const result = await props.getALlStudents()
    }, []);


    const CreateNewStudent = async ()=>{
        SetShowCreateDrawer(true)
    }

    const refresher = async()=>{
        router.reload(window.location.pathname)
        console.log("refresr");
        // router.push(router.asPath)
    }

    return (
        <>
            <Row >
                <Col className="gutter-row" offset={21}>
                    <Button onClick={()=>{CreateNewStudent()}} type="primary">Add Student</Button>
                </Col>
            </Row>
            <Row>
                <br></br>
            </Row>
            <Row gutter={100}>
                {props.students ?
                    props.students.map(student => {
                        return <StudentElement
                            StudentsEle={student}
                            SetShowDrawer={SetShowDrawer}
                            SetIsUpdate={SetIsUpdate}
                            SetselectedStudent={SetselectedStudent}
                            refresher={refresher}
                        />
                    }) : <Empty />
                }
            </Row>
            <ManageForm
                showDrawer={showDrawer}
                SetShowDrawer={SetShowDrawer}
                data={selectedStudent}
                refresher={refresher}
            />
            <ManageCreateForm
                showDrawer={showCreateDrawer}
                SetShowDrawer={SetShowCreateDrawer}
                data={null}
                refresher={refresher}
            />
            {props.students ?
                <GridExample student={props.students}/>
                : <div></div>
             }
       
        </>
    )
}

const mapStateToProps = (state) => ({
    students: state.students.students,
});

const mapDispatchToProps = (dispatch, schoolId) => ({
    getALlStudents: () => getALlStudents(dispatch, schoolId),


});
export default connect(mapStateToProps, mapDispatchToProps)(StudentsUi)
