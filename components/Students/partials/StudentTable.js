import React, { useState } from 'react';
import { render } from 'react-dom';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const GridExample = ({ student }) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);

    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);

    };

    const onBtExport = () => {
        console.log("w");
        gridApi.exportDataAsExcel();
      };
    
    return (
        <>
        <div style={{ width: '60%', height: '150%' ,margin:"0 auto"}}>
        <button
            onClick={() => onBtExport()}
            style={{ marginBottom: '5px', fontWeight: 'bold' }}
          >
            Export to Excel
          </button>
            <div style={{ height: '100%', boxSizing: 'border-box' }}>
                <div
                    id="myGrid"
                    style={{
                        height: '150%',
                        width: '60%',
                    }}
                    className="ag-theme-alpine"
                >
                    <AgGridReact
                        defaultColDef={{
                            width: 250,
                            editable: true,
                            filter: 'agTextColumnFilter',
                            floatingFilter: true,
                            resizable: true,
                        }}
                        defaultColGroupDef={{ marryChildren: true }}
                        columnTypes={{
                            numberColumn: {
                                width: 250,
                                filter: 'agNumberColumnFilter',
                            },
                        }}
                        rowData={student}
                        onGridReady={onGridReady}
                    >
                        <AgGridColumn headerName="StudentID" field="StudentID" />
                        <AgGridColumn headerName="StudentFullName" field="StudentFullName" />
                    </AgGridReact>
                </div>
                <br></br>
                <br></br>
            </div>
        </div>
    </>
    );
};

export default GridExample