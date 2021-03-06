import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Button, Col, Row, message } from 'antd';
import Image from 'next/image'
import { EditOutlined, DeleteOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import schoolImage from '../../public/school.png';
import Link from 'next/link'
import { useRouter } from 'next/router'

import ManageForm from './partials/ManageForm';
import { SCHOOLS_LOADED } from './School.actions'
import {deleteSchool} from './SchoolModel'


const { Meta } = Card;


const showDeleteMoadel = (SchoolID,refresher) => {
    deleteSchool(SchoolID).then(res=>{
        refresher()
        message.success("School Deleted", 3)
    }).catch(e=>{
        message.error(e, 3)
    })
    

}


const SchoolElement = ({ school, selectSchoolDrwaer ,refresher}) => {

    const OnSchool = () => {

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
                    <EditOutlined key="edit" onClick={() => {
                        selectSchoolDrwaer(school)
                    }} />,
                    <DeleteOutlined key="Delete" onClick={()=>showDeleteMoadel(school.SchoolID,refresher)} />,
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
    const router = useRouter()
    const [showDrawer, SetShowDrawer] = useState(false)
    const [isUpdate, SetIsUpdate] = useState(false)
    const [selectedSchool, SetselectedSchool] = useState(null)

    useEffect(async () => {
        const result = await props.fetchSchools()
    }, []);


    const selectSchoolDrwaer = (school) => {
        SetselectedSchool(school)
        SetShowDrawer(true)
        SetIsUpdate(true)
    }

    const CreateNewSchool = async ()=>{
        SetselectedSchool(null)
        SetShowDrawer(true)
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
                    <Button onClick={()=>{CreateNewSchool()}} type="primary">Add School</Button>
                </Col>
            </Row>
            <Row>
                <br></br>
            </Row>
            <Row gutter={16}>
                {props.schools.schools ?
                    props.schools.schools.map(school => {
                        return <SchoolElement
                            school={school}
                            selectSchoolDrwaer={selectSchoolDrwaer}
                            refresher={refresher}
                        />
                    }) : <h1> Loading .....</h1>
                }
            </Row>
            <ManageForm
                showDrawer={showDrawer}
                data ={selectedSchool || null}
                SetShowDrawer={SetShowDrawer}
                refresher={refresher}
                SetIsUpdate={SetIsUpdate}
            />

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
