import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FormInput from "../../components/Contact/FormInput";
function Contact() {
    const initialValues = {
        firstName: {
            value: "",
            type: "text",
        },
        lastName: {
            value: "",
            type: "text",
        },
        email: {
            value: "",
            type: "email",
        },
        deneme: {
            value: "",
            type: "checkbox",
        },
    };

    const formik = useFormik({
        initialValues: Object.fromEntries(
            Object.entries(initialValues).map(([key, value]) => [
                key,
                value.value,
            ])
        ),
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(15, "Must be 15 characters or less")
                .required("Required"),
        }),
        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });

    const formInputs = Object.entries(initialValues).map(([key, value]) => (
        <FormInput
            className="border border-gray-300"
            key={key}
            formik={formik}
            labelText={key}
            value={formik.values[key]}
            nameId={key}
            type={value.type}
        />
    ));

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                {formInputs}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Contact;
