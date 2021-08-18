import React, {useState} from 'react';
import {Button, Card, Col, Input, PageHeader, Row, Space, Table} from 'antd';
import {
    SearchOutlined,
    ExportOutlined,
    ReloadOutlined,
    SettingOutlined
} from '@ant-design/icons';
// import {default as Highlighter} from "react-highlight-words";
import ReactExport from 'react-export-excel';
import moment from 'moment';
import {Resizable} from 'react-resizable';
import {useTranslation} from "react-i18next";
// import {VList} from 'virtual-table-ant-design';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ResizableTitle = (props: any) => {
    const {onResize, width, resize = false, ...restProps} = props;

    if (!resize) {
        return <th {...restProps} />;
    }

    return (
        <Resizable
            width={width || 30}
            height={0}
            handle={
                <span
                    className="react-resizable-handle"
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            }
            onResize={onResize}
            draggableOpts={{enableUserSelectHack: false}}
        >
            <th {...restProps} />
        </Resizable>
    );
};

function AppTable(props: any) {
    let searchInput: any = '';
    const [searchText, setSearchText]: any = useState();
    const [searchedColumn, setSearchedColumn]: any = useState();
    const [showSettingsDrawer, setShowSettingsDrawer]: any = useState(false);

    const {t} = useTranslation();

    const [filteredInfo, setFilteredInfo]: any = useState();
    const [showClearFilters, setShowClearFilters]: any = useState();
    const [columns, setColumns]: any = useState(props.columns);
    const [sortedInfo, setSortedInfo]: any = useState();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const [totalRows, setTotalRows]: any = useState(props.dataSource.length);

    const ExportToExcelButton = () => {
        const __columns = columns
            .map((column: any) => {
                return !column.dataIndex
                    ? null
                    : {
                        label: column.title,
                        dataSetKey: column.dataIndex
                    };
            })
            .filter((obj: any) => obj);

        const filename =
            props.info.excelFileName + '-' + moment().format('DD-MM-YYYY');

        return (
            <ExcelFile
                filename={filename}
                key={'_export'}
                element={
                    <Button
                        title={t('Export')}
                        style={{
                            border: 'none',
                            boxShadow: 'none',
                            padding: 0
                        }}
                    >
                        <ExportOutlined
                            style={{
                                fontSize: 20,
                                verticalAlign: 'top'
                            }}
                        />
                        {t('Export')}
                    </Button>
                }
            >
                <ExcelSheet data={props.applications} name={info.excelFileName}>
                    {__columns.map((column: any) => (
                        <ExcelColumn
                            key={column.dataSetKey}
                            label={column.label}
                            value={column.dataSetKey}
                        />
                    ))}
                </ExcelSheet>
            </ExcelFile>
        );
    };

    const getColumnSearchProps = (dataIndex: any, onFilter?: any) => ({
        filterDropdown: ({
                             setSelectedKeys,
                             selectedKeys,
                             confirm,
                             clearFilters
                         }: any) => (
            <div style={{padding: 8}}>
                <Input
                    ref={(node) => {
                        searchInput = node;
                    }}
                    placeholder={`${t('Search')} ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{width: 188, marginBottom: 8, display: 'block'}}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined/>}
                        size="small"
                        style={{width: 90}}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => handleReset(clearFilters)}
                        size="small"
                        style={{width: 90}}
                    >
                        {t('Reset')}
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered: any) => (
            <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}}/>
        ),
        onFilter: onFilter
            ? onFilter
            : (value: any, record: any) => {
                return record[dataIndex]
                    ? record[dataIndex]
                        .toString()
                        .toLowerCase()
                        .includes(value.toLowerCase())
                    : '';
            },
        onFilterDropdownVisibleChange: (visible: any) => {
            if (visible) {
                setTimeout(() => searchInput.select(), 100);
            }
        }
        // render: (text: any) => text
    });

    const getColumnMultiSelectProps = (dataIndex: any) => ({
        onFilter: (value: string, record: any) => {
            return record[dataIndex].toString().indexOf(value) !== -1;
        },
        sorter: (a: any, b: any) => a[dataIndex].length - b[dataIndex].length
    });

    const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters: any) => {
        clearFilters();
        setSearchText('');
    };

    const components = {
        header: {
            cell: ResizableTitle
        }
    };

    const tableChanged = (
        pagination: any,
        filters: any,
        sorter: any,
        extra: { currentDataSource: [] }
    ) => {
        const showClearFilters: any =
            (Object.keys(sorter).length && sorter.constructor === Object) ||
            Object.keys(filters).filter((key) => filters[key] !== null).length;
        setTotalRows(extra.currentDataSource.length);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
        setShowClearFilters(showClearFilters);
    };

    const clearFilters = () => {
        setFilteredInfo(null);
        setSortedInfo(null);
        setShowClearFilters(false);
    };

    const setFiltersStatus = () => {
        _columns = (_columns || columns).map((col: any) => {
            if (col.onFilter) {
                col.filteredValue = filteredInfo
                    ? filteredInfo[col.dataIndex] || null
                    : null;
            }
            if (col.sorter) {
                col.sortJob = sortedInfo
                    ? sortedInfo.columnKey === col.dataIndex && sortedInfo.job
                    : false;
            }

            return col;
        });
    };

    const onSelectChange = (selectedRowKeys: any) => {
        setSelectedRowKeys(selectedRowKeys);
    };

    const handleResize = (index: number) => (e: any, {size}: any) => {
        const nextColumns = [..._columns];
        nextColumns[index] = {
            ...nextColumns[index],
            width: size.width
        };
        setColumns(nextColumns);
        /*this.setState(
            ({ columns }: any) => {
            const nextColumns = [...columns];
            nextColumns[index] = {
                ...nextColumns[index],
                width: size.width,
            };
            return { columns: nextColumns };
        });*/
    };

    let _columns = (columns || props.columns || []).map(
        (col: any, index: number) => {
            let column = col;
            if (column.custom) {
                column.custom.forEach((_col: any) => {
                    if (_col.type === 'search') {
                        if (column.render) {
                            column = {
                                ...column,
                                ...getColumnSearchProps(
                                    _col.field,
                                    _col.onFilter
                                ),
                                render: column.render
                            };
                        } else {
                            column = {
                                ...column,
                                ...getColumnSearchProps(_col.field)
                            };
                        }
                    }
                    if (_col.type === 'multiSelect') {
                        column = {
                            ...column,
                            ...getColumnMultiSelectProps(_col.field)
                        };
                    }
                });
                delete column.custom;
            }
            column.onHeaderCell = (column: any) => {
                return {
                    width: column.width,
                    resize: column.resize,
                    onResize: handleResize(index)
                };
            };
            return column;
        }
    );

    const {
        info,
        dataSource,
        loading,
        selectableRows = false,
        exportable = true,
        mainActionButton = null,
        onRefresh,
        footerActions = []
    } = props;

    const tableOptions: any = {};
    if (selectableRows) {
        tableOptions['rowSelection'] = {
            selectedRowKeys,
            onChange: onSelectChange
        };
    }

    const hasSelected = selectedRowKeys.length > 0;

    setFiltersStatus();

    let actions = [
        showClearFilters ? (
            <Button key={'_clear_filter'} onClick={clearFilters}>
                Clear Filters
            </Button>
        ) : null,
        <Button
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
        </Button>,
        props.manageColumns && (
            <Button
                key={'manage-columns'}
                title={t('Settings')}
                onClick={() => {
                    setShowSettingsDrawer(true);
                }}
                style={{
                    border: 0,
                    boxShadow: 'none',
                    padding: 0
                }}
            >
                <SettingOutlined
                    style={{
                        fontSize: 20,
                        verticalAlign: 'top'
                    }}
                />
            </Button>
        )
    ];

    if (hasSelected) {
        actions = [...props.childBulkActions, ...actions];
    }

    if (mainActionButton) {
        actions.unshift(mainActionButton);
    }
    if (exportable) {
        actions.unshift(ExportToExcelButton());
    }

    return (
        <Card bodyStyle={{padding: 0}} bordered={props.bordered === undefined ? true : props.bordered}>
            <PageHeader
                title={info.tableTitle}
                // breadcrumb={{this.routes}}
                subTitle={info.tableSubtitle}
                extra={actions}
            />
            <div style={{overflow: 'hidden'}} className={'app-table-container'}>
                <Table
                    pagination={props.pagination ? { position: ['none', 'bottomCenter'] } : false}
                    locale={{emptyText: t('No Data')}}
                    size="small"
                    components={components}
                    rowKey={props.rowKey ? props.rowKey : 'id'}
                    style={{maxWidth: '100%', boxSizing: 'border-box'}}
                    id={'app-table'}
                    loading={loading}
                    /*scroll={{y: '226px', x: true}}
                components={VList({
                    height: 226,
                })}*/
                    bordered
                    onChange={tableChanged}
                    dataSource={dataSource}
                    columns={_columns}
                    footer={
                        totalRows > 0 || footerActions.length > 0
                            ? () => (
                                <Row
                                    justify={'space-between'}
                                    align={'middle'}
                                >
                                    <Col>
                                        {totalRows > 0 && (
                                            <div>
                                                {t('Total Rows')}: <b>{totalRows}</b>{' '}
                                                {t('rows')}
                                            </div>
                                        )}
                                    </Col>
                                    <Col>
                                        {footerActions.map(
                                            (action: any) => action
                                        )}
                                    </Col>
                                </Row>
                            )
                            : null
                    }
                    {...tableOptions}
                />
            </div>
        </Card>
    );
}

export interface Custom {
    type: 'search' | 'multiSelect';
    field: string;
    onFilter?: (value: any, record: any) => void;
}

export default AppTable;
