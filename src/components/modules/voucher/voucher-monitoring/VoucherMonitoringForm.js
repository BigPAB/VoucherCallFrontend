import React, {useEffect, useState} from 'react';
import {Form, Formik} from "formik";
import {Button} from "primereact/button";
import * as yup from "yup";
import * as API from "./../../../commons/api/axios-api";
import {FormDropdown} from "../../../commons/form/FormInputs";
import {VOUCHER_CALL_URL} from "../../../commons/api/url-const";
import {padStart} from "lodash";

const VoucherMonitoringForm = ({record, handleSave, handleCancel}) => {

    const [count, setCount] = useState(null);

    const voucherValidation = yup.object().shape({
        type: yup.string().required("Campo Obrigatório!")
    });

    useEffect(() => {
        API.getDataset(VOUCHER_CALL_URL + "/count", setCount);
    }, []);

    const handleSubmit = (formData) => {
        formData.number = formData.type + padStart(count, 4, 0);
        formData.registerDate = new Date();
        handleSave(formData)
    };

    const types = [
        {id: "P", value: 'preferential'},
        {id: "N", value: 'normal'},
    ];

    return (
        <React.Fragment>
            <Formik initialValues={record} onSubmit={handleSubmit} validationSchema={voucherValidation}>
                {(props) =>
                    <Form onSubmit={props.handleSubmit}>
                        <div className={'p-grid'}>
                            <div className={'p-col-12'}>
                                <FormDropdown
                                    label={'Type'}
                                    events={props}
                                    field={"type"}
                                    optionId={"id"}
                                    optionValue={"value"}
                                    suggestions={types}
                                />
                            </div>
                        </div>
                        <Button label={"Save"} type={"submit"} className="btn btn-primary" onSubmit={props.handleSubmit}/>
                        <Button label={"Cancel"} type={"button"} className="btn btn-primary" onClick={handleCancel}/>
                    </Form>
                }
            </Formik>
        </React.Fragment>
    )
}

export default VoucherMonitoringForm;