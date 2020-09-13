import React, {useEffect, useState} from 'react';
import {Button} from "primereact/button";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {useHistory} from "react-router";
import {isEmpty, filter} from 'lodash';

const VoucherCallList = ({dataset, handleSave}) => {

    const history = useHistory();
    const [disableNormalVouchers, setDisableNormalVouchers] = useState(false);

    useEffect(() => {
        setDisableNormalVouchers(dataset && !isEmpty(filter(dataset, voucher => voucher.type === "P")));
    }, [dataset]);

        const renderType = () => {
        return (
            (rowData) => rowData.type === "P" ? "Preferential" : "Normal"
        )
    }

    const renderActions = () => {
        return (
            (rowData) =>
                <span style={{color: 'blue', cursor:'pointer'}} >
                    <Button
                        label="Call"
                        icon="pi pi-check"
                        className="p-button-raised"
                        onClick={() => handleCall(rowData)}
                        disabled={disableNormalVouchers && rowData.type === "N"}
                    />
                </span>
        )
    };

    const handleCall = data => {
        data.called = true;
        data.calledDate = new Date();
        handleSave(data);
    }

    const columns = [
        {field: "number", header: ('Number')},
        {field: "type", header: ('Type'), body: renderType(), sortable: false},
        {field: "registerDate", header: ('Register date')},
        {field:"", header: ('Ações'), sortable: false, body: renderActions(), style: {width: '8em', textAlign: 'center'} },
    ];

    return (
        <>
            <Button label="Monitoring" icon="pi pi-search" className="p-button-raised" onClick={() => history.push("/voucher-monitoring")}/>
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

export default VoucherCallList;
