import React, {useEffect, useState} from 'react';
import * as API from './../../../commons/api/axios-api';
import {VOUCHER_CALL_URL} from "../../../commons/api/url-const";
import VoucherCallList from "./VoucherCallList";

const VoucherCallContainer = () => {

    const [vouchers, setVouchers] = useState(null);

    useEffect(() => {
        getDatasetFromApi();
    }, [])

    const getDatasetFromApi = () => {
        API.getDataset(VOUCHER_CALL_URL, setVouchers, {params: {called: false}});
    };

    const handleSave = (formData) => {
        API.putData(VOUCHER_CALL_URL, formData.id, formData)
            .then(() => {
                getDatasetFromApi();
            })
            .catch((error) => alert(error));
    };

    return (
        <>
            <h1>Voucher Call</h1>
            <VoucherCallList dataset={vouchers} handleSave={handleSave}/>
        </>
    )

}

export default VoucherCallContainer;
