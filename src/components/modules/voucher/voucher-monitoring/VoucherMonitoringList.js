import React from 'react';
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import { useHistory } from 'react-router-dom';

const VoucherMonitoringList = ({dataset, loggedUser, handleNew, handleDelete}) => {

    const history = useHistory();

    const renderType = () => {
        return (
            (rowData) => rowData.type === "P" ? "Preferential" : "Normal"
        )
    };

    const columns = [
        {field: "number", header: ('Number')},
        {field: "type", header: ('Type'), body: renderType()},
        {field: "registerDate", header: ('Register date'), sortable: false},
        {field: "calledDate", header: ('Called Date')},
    ];

    return (
        <>
            <Button label="Generate" icon="pi pi-plus" className="p-button-raised" onClick={handleNew}/>
            {loggedUser && loggedUser.profile === "M" &&
                <>
                    <Button label="Call" icon="pi pi-check" className="p-button-raised" onClick={() => history.push("/voucher-call")}/>
                    <Button label="Reinitialize count" icon="pi pi-refresh" className="p-button-raised" onClick={handleDelete}/>
                </>
            }
            <DataTable
                // ref={(el) => dataTable = el}
                value={dataset}
                rows={10}
                style={{width: '100%'}}
            >
                {columns.map((col) => {
                    return <Column
                        key={col.field}
                        field={col.field}
                        header={col.header}
                        style={col.style}
                        body={col.body === undefined ? null : col.body}
                    />;
                })}
            </DataTable>
        </>
    )
}

export default VoucherMonitoringList;
