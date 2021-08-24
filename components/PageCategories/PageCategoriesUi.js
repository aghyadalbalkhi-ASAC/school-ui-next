import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Card, Button, Col, Row, message } from 'antd';
import Image from 'next/image'
import { EditOutlined, DeleteOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import classImage from '../../public/classroom.png'
import Link from 'next/link'
import { useRouter } from 'next/router'

import ManageForm from './partials/ManageForm';
import { PAGES_LOADED } from './PageCategories.actions'
import { deletePage } from './PageCategoriesModel'


const { Meta } = Card;


const showDeleteMoadel = (ClassID, refresher) => {
    deletePage(ClassID).then(res => {
        refresher()
        message.success("Page Deleted", 3)
    }).catch(e => {
        message.error(e, 3)
    })


}


const PageElement = ({ page, selectPageDrwaer, refresher }) => {

    return (
        <Col span={8}>
            <Card key={page.ClassID}
                style={{ width: 300 }}
                cover={
                    <Image src={classImage} alt="Picture of the author" />
                }
                actions={[
                    <EditOutlined key="edit" onClick={() => {
                        selectPageDrwaer(page)
                    }} />,
                    <DeleteOutlined key="Delete" onClick={() => showDeleteMoadel(page.ClassID, refresher)} />,
                ]}
            >
                <Meta
                    avatar={<CheckCircleTwoTone twoToneColor="#52c41a" />}
                    title={page.ClassName}
                    description="This is the description"
                />
            </Card>
            <br></br><br></br>
        </Col>
    )

}

function PageCategoriesUi(props) {
    const router = useRouter()
    const [showDrawer, SetShowDrawer] = useState(false)
    const [isUpdate, SetIsUpdate] = useState(false)
    const [selectedPage, SetselectedPage] = useState(null)

    useEffect(async () => {
        const result = await props.fetchPages()
    }, []);


    const selectPageDrwaer = (page) => {
        SetselectedPage(page)
        SetShowDrawer(true)
        SetIsUpdate(true)
    }

    const CreateNewPage = async () => {
        SetselectedPage(null)
        SetShowDrawer(true)
    }

    const refresher = async () => {
        router.reload(window.location.pathname)
        console.log("refresr");
        // router.push(router.asPath)
    }
    return (
        <>
            <Row >
                <Col className="gutter-row" offset={18}>
                    <Button onClick={() => { CreateNewPage() }} type="primary">Add New Class Gategory</Button>
                </Col>
            </Row>
            <Row>
                <br></br>
            </Row>
            <Row gutter={16}>
                {props.pages.pages ?
                    props.pages.pages.map(page => {
                        return (
                            <>
                            
                                <PageElement
                                    page={page}
                                    selectPageDrwaer={selectPageDrwaer}
                                    refresher={refresher}
                                />

                            </>
                        )
                    }) : <h1> Loading .....</h1>
                }
            </Row>
            <ManageForm
                showDrawer={showDrawer}
                data={selectedPage || null}
                SetShowDrawer={SetShowDrawer}
                refresher={refresher}
                SetIsUpdate={SetIsUpdate}
            />

        </>
    )
}



async function getProductsFromDatabase(dispatch) {
    const url = `http://[::1]:3000/classes`

    const pay = await axios.get(url).then(res => {
        dispatch({
            type: PAGES_LOADED,
            payload: res.data
        })
    })

}

const mapStateToProps = state => ({
    pages: state.pages,
});

const mapDispatchToProps = (dispatch) => ({
    fetchPages: () => getProductsFromDatabase(dispatch)

});
export default connect(mapStateToProps, mapDispatchToProps)(PageCategoriesUi)
