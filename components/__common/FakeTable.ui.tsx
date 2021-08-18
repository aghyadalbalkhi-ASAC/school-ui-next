import {Card, PageHeader, Skeleton} from "antd";
import React from "react";

const FakeTable = (props: any) => {
    return <>
        <PageHeader style={{backgroundColor: 'white'}}
                    title={<Skeleton.Input size={"small"} style={{width: 100}}/>}
                    extra={[
                        <Skeleton.Button key={'button-fake'} active size={"small"}
                                         shape={"circle"}/>
                    ]}
        />
        <Card>
            <Skeleton active paragraph={{rows: 4}}/>
        </Card>
    </>;
};

export default FakeTable;
