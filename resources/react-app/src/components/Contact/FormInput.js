import React from "react";

function FormInput({ formik, labelText, value, nameId, type, className }) {
    return (
        <div>
            {labelText && <label htmlFor={nameId}>{labelText}</label>}
            <input
                className={className}
                id={nameId}
                name={nameId}
                type={type}
                onChange={formik.handleChange}
                value={value}
            />
        </div>
    );
}

export default FormInput;
