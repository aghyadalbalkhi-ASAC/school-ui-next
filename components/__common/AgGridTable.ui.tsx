import React, {useEffect, useState} from 'react';
import {AgGridReact} from '@ag-grid-community/react';

import '@ag-grid-enterprise/all-modules/dist/styles/ag-grid.css';
import '@ag-grid-enterprise/all-modules/dist/styles/ag-theme-alpine.css';
import {AllModules} from '@ag-grid-enterprise/all-modules';
import {Button, Card, Col, PageHeader, Row, Space} from "antd";
import {ReloadOutlined} from "@ant-design/icons";
import './../ag-grid-custom.scss';
import {useTranslation} from "react-i18next";
import NumericCellEditor from '../../services/agGridHelpers';
import {setFullScreen} from "../../services/helpers";
// import 'ag-grid-enterprise';
let isResettingTable: boolean;
let ngGridReady: boolean = false;

const AgGridTable = (props: any) => {
    const [gridApi, setGridApi]: any = useState(null);
    const [gridColumnApi, setGridColumnApi]: any = useState(null);
    const [restTableStateButton, setRestTableStateButton]: any = useState(false);
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [totalRows, setTotalRows]: any = useState(0);

    const {t, i18n} = useTranslation();
    /*const [rowData, setRowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ]);*/

    const clearFilters = () => {
        isResettingTable = true;
        localStorage.removeItem(`table-${id}`);
        gridColumnApi.resetColumnState();
        setRestTableStateButton(false);
    };


    const hasSelected = selectedRowKeys.length > 0;


    const {
        info,
        id = null,
        dataSource,
        fullScreen = false,
        richFeatures = true,
        allowAnimate = true,
        showRefresh = true,
        mainActionButton = null,
        onSelectionChanged = null,
        onGridReady = null,
        onRefresh,
        columns = [],
        renderFramework = {},
        footerActions = [],
        mainActions = [],
        hideTableHeader = false,
        hideTableFooter = false,
        isRowSelectable = null,
        getRowNodeId = null,
        childColDef = []
    } = props;

    let tableState: any;
    if (id) {
        tableState = localStorage.getItem(`table-${id}`);
    }

    let actions = [
        ...mainActions,
        restTableStateButton ? (
            <Button key={'_clear_filter'} onClick={clearFilters}>
                {t('Reset Table')}
            </Button>
        ) : null,
        showRefresh ? <Button
            key={'_refresh'}
            title={t('Refresh')}
            onClick={onRefresh}
            style={{
                border: 0,
                boxShadow: 'none',
                padding: 0
            }}
        >
            <ReloadOutlined
                style={{
                    fontSize: 20,
                    verticalAlign: 'top'
                }}
            />
        </Button> : null
    ];

    if (hasSelected) {
        actions = [...props.childBulkActions, ...actions];
    }

    if (mainActionButton) {
        if (typeof mainActionButton === 'object') {
            actions.unshift(...mainActionButton);
        } else {
            actions.unshift(mainActionButton);
        }

    }
    let finalColumns = columns;
    if (!richFeatures) {
        finalColumns = finalColumns.map((col: any) => {
            col.floatingFilter = false;
            return col;
        });
    }

    const detailCellRendererParams = {

        // provide the Grid Options to use on the Detail Grid
        detailGridOptions: {
            columnDefs: childColDef,
            frameworkComponents: renderFramework,
            defaultColDef: {flex: 1},
        },
        // get the rows for each Detail Grid
        getDetailRowData: function (params: any) {
            params.successCallback(params.data.details);
        }
    };


    const defaultColDef = {
        sortable: true,
        // flex: 1,
        resizable: true,
        filter: 'agTextColumnFilter'
    };

    /*for(const col of columns){
        if(!col.render){
            continue;
        }
        renderFramework[col.field] = col.render;
    }*/

    setFullScreen(fullScreen);

    useEffect(() => {
        if (tableState && gridColumnApi) {
            console.log(JSON.parse(tableState));
            setRestTableStateButton(true)
            gridColumnApi.applyColumnState({state: JSON.parse(tableState), applyJob: true});
        }
        setTotalRows(dataSource?.length || 0);
    }, [
        dataSource,
        gridColumnApi
    ]);


    const onColumnEverythingChanged = (event: any) => {


        if (!id || !ngGridReady || isResettingTable) {
            isResettingTable = false;
            return;
        }
        console.log(event);
        if (gridColumnApi) {
            const savedState = event.columnApi.getColumnState();
            localStorage.setItem(`table-${id}`, JSON.stringify(savedState));
            setRestTableStateButton(true);
        }

    }


    const onFilterChanged = () => {
        const _totalRows = gridApi?.getModel().rootNode.childrenAfterFilter.reduce((i: number, node: any) => {
            return i + (node.allChildrenCount || 1)
        }, 0);
        setTotalRows(_totalRows)
    }
    const enableRtl = i18n.dir() === 'rtl';
    return (
        <Card bodyStyle={{padding: 0}} bordered={props.bordered === undefined ? true : props.bordered}
              className={`${fullScreen ? 'full-screen' : ''}`}>
            {
                !hideTableHeader && <PageHeader
                    title={info?.tableTitle}
                    // breadcrumb={{this.routes}}
                    subTitle={info?.tableSubtitle}
                    extra={<Space>
                        {actions.map((ac: any, index: number) => ac)}
                    </Space>}
                />
            }
            <div style={{overflow: "hidden"}} className={`app-table-container ${fullScreen ? 'full-screen' : ''}`}>
                <div className="ag-theme-alpine" style={{height: 300}}>
                    <AgGridReact rowSelection="multiple"
                                 modules={AllModules}
                                 enableRtl={enableRtl}
                                 groupSelectsChildren={true}
                                 autoGroupColumnDef={{
                                     headerName: '',
                                     minWidth: 30,
                                     cellRendererParams: {
                                         suppressCount: false,
                                         checkbox: false,
                                     }
                                 }}
                                 components={{
                                     numericCellEditor: NumericCellEditor
                                 }}
                                 suppressAggFuncInHeader={true}
                                 stopEditingWhenGridLosesFocus={true}
                                 singleClickEdit={true}
                                 getRowNodeId={getRowNodeId}
                                 isRowSelectable={isRowSelectable}
                                 onFilterChanged={onFilterChanged}
                                 onGridColumnsChanged={onColumnEverythingChanged}
                                 onColumnGroupOpened={onColumnEverythingChanged}
                                 onColumnResized={onColumnEverythingChanged}
                                 onColumnPinned={onColumnEverythingChanged}
                                 onColumnMoved={onColumnEverythingChanged}
                                 masterDetail={richFeatures && !!childColDef && childColDef.length > 0}
                                 detailCellRendererParams={detailCellRendererParams}
                                 animateRows={richFeatures && allowAnimate}
                                 sideBar={richFeatures && {
                                     toolPanels: ['columns', 'filters']
                                 }}
                                 statusBar={richFeatures && {
                                     statusPanels: [
                                         {
                                             statusPanel: 'agAggregationComponent',
                                             statusPanelParams: {
                                                 aggFuncs: ['count', 'sum', 'avg', 'min', 'max'],
                                             },
                                         },
                                     ],
                                 }}
                                 enableRangeSelection={richFeatures}
                                 defaultColDef={defaultColDef}
                                 columnDefs={finalColumns}
                                 onSelectionChanged={onSelectionChanged}
                                 frameworkComponents={renderFramework}
                                 onGridReady={(params: any) => {
                                     ngGridReady = true;
                                     console.log('ready');
                                     if (typeof onGridReady === 'function') {
                                         onGridReady(params);
                                     }
                                     setGridApi(params.api);
                                     setGridColumnApi(params.columnApi);
                                 }}
                                 suppressRowClickSelection={true}
                                 rowData={dataSource}>
                        {/*{
                            columns.map(
                                (column: any, index: number) => <AgGridColumn key={index} field={column.field}
                                                                              cellRenderer={column.cellRenderer}
                                                                              cellRendererParams={column.cellRendererParams}
                                                                              headerName={column.label}
                                                                              sortable={column.sortable === undefined ? defaultColDef.sortable : column.sortable}
                                                                              filter={column.filter}

                                    // cellRenderer={column.render || null}
                                                                              checkboxSelection={index === 0 && selectableRows}></AgGridColumn>
                            )
                        }*/}
                        {/*<AgGridColumn field="make" sortable={true} filter={true}
                                      checkboxSelection={true}></AgGridColumn>
                        <AgGridColumn field="model" sortable={true} filter={true}></AgGridColumn>
                        <AgGridColumn field="price" sortable={true} filter={true}></AgGridColumn>*/}
                    </AgGridReact>
                </div>
            </div>
            {
                !hideTableFooter && <div style={{
                    background: '#fafafa',
                    padding: '8px 8px',
                    borderRight: '1px solid #f0f0f0',
                    borderLeft: '1px solid #f0f0f0'
                }}>
                    {
                        (totalRows || footerActions.length > 0) &&
                        <Row justify={'space-between'} align={'middle'}>
                            <Col>
                                {
                                    totalRows > 0 && <div>
                                        {t('Total Rows')}: <b>{totalRows}</b> {t('rows')}
                                    </div>
                                }
                            </Col>
                            <Col>
                                {footerActions.map((action: any) => action)}
                            </Col>
                        </Row>
                    }
                </div>
            }
        </Card>

    );
};

export default AgGridTable;
