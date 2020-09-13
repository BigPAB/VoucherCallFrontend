import React, {useEffect, useState} from 'react';
import * as API from '../../../commons/api/axios-api';
import {VOUCHER_CALL_URL} from "../../../commons/api/url-const";
import VoucherMonitoringList from "./VoucherMonitoringList";
import VoucherMonitoringForm from "./VoucherMonitoringForm";

const VoucherMonitoringContainer = () => {

    const initialState = {
        name: "",
        date: "",
        type: "",
        called: false
    }

    const [vouchers, setVouchers] = useState(null);
    const [voucher, setVoucher] = useState(initialState);
    const loggedUser = JSON.parse(sessionStorage.getItem("user"));
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        getDatasetFromApi();
    }, [])

    const getDatasetFromApi = () => {
        API.getDataset(VOUCHER_CALL_URL, setVouchers, {params: {called: true}});
    };

    const handleSave = (formData) => {
        API.postData(VOUCHER_CALL_URL, formData)
            .then(() => {
                getDatasetFromApi();
                toggleForm();
            })
            .catch((error) => alert(error));
    };

    const handleDelete = () => {
        API.deleteData(VOUCHER_CALL_URL)
            .then(() => getDatasetFromApi());
    };

    const toggleForm = () => {
        setEditing(!editing);
    };

    const handleNew = () => {
        setVoucher(initialState);
        toggleForm();
    };

    return (
        <>
            <h1>Voucher Monitoring</h1>
            {editing ?
                <VoucherMonitoringForm record={voucher} handleSave={handleSave} handleCancel={toggleForm}/> :
                <VoucherMonitoringList dataset={vouchers} loggedUser={loggedUser} handleNew={handleNew} handleDelete={handleDelete}/>
            }
        </>
    )

}

export default VoucherMonitoringContainer;
