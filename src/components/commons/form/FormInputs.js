import React from "react";
import {Dropdown} from "primereact/dropdown";


export const FormDropdown = ({events, value, setValue, field, optionId, optionValue, suggestions, label}) => {

    const handleChange = (e) => {
        events ? events.setFieldValue(field, e.value) : setValue(e.value);
    }

    const getOptions = suggestions.map(option => {return {label: option[optionValue], value: option[optionId]}})

    return (
        <>
            <label>{label}</label><br />
            <Dropdown name={field} value={events ? events.values[field] : value} options={getOptions} onChange={handleChange} placeholder="Select Data"/>
        </>
    )
}