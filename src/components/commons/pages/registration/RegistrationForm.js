import React from 'react';
import * as yup from "yup";
import {Form, Formik} from "formik";
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import {FormDropdown} from "../../form/FormInputs";

const RegistrationForm = ({record, handleSave, handleCancel}) => {
    const userValidation = yup.object().shape({
        username: yup.string().required("Campo Obrigatório!"),
        profile: yup.string().required("Campo Obrigatório!"),
    });

    const handleSubmit = (formData) => {
        handleSave(formData)
    };

    const profiles = [
        {id: "M", value: 'manager'},
        {id: "C", value: 'customer'},
    ];

    return (
        <React.Fragment>
            <Formik initialValues={record} onSubmit={handleSubmit} validationSchema={userValidation}>
                {(props) =>
                    <Form onSubmit={props.handleSubmit}>
                        <div className={'p-grid'}>
                            <div className={'p-col-12'}>
                                <label>Username:</label><br />
                                <InputText name={"username"} value={props.values['username']} onChange={props.handleChange}/>
                            </div>
                            <div className={'p-col-12'}>
                                <FormDropdown
                                    label={'Profile'}
                                    events={props}
                                    field={"profile"}
                                    optionId={"id"}
                                    optionValue={"value"}
                                    suggestions={profiles}
                                />
                            </div>
                        </div>
                        <Button label={"Register"} type={"submit"}  className="btn btn-primary" onSubmit={props.handleSubmit}/>
                        <Button label={"Cancel"} type={"button"} className="btn btn-primary" onClick={handleCancel}/>
                    </Form>
                }
            </Formik>
        </React.Fragment>
    )
};

export default RegistrationForm;