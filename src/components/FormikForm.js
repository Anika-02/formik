import { useState } from 'react';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import './formikform.css';

export default function FormikForm() {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Required field';
        }

        if (!values.email) {
            errors.email = 'Required field';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'Invalid email format';
        }

        if (!values.phone) {
            errors.phone = 'Required field';
        } else if (!/^\d{12}$/.test(values.phone)) {
            errors.phone = 'Phone number must be 12 digits';
        }

        return errors;
    };

    const handleSubmit = (values, { resetForm }) => {
        console.log(values);
        setIsFormSubmitted(true);
        resetForm();
    };

    return (
        <div className='wrapper'>
            <Formik
                initialValues={{
                    name: '',
                    email: '',
                    phone: '',
                }}
                validate={validate}
                onSubmit={handleSubmit}
            >
                <Form>
                    <div className='input-field'>
                        <span className='title'>Name </span>
                        <Field type='text' name='name' className='field' />
                        <ErrorMessage name='name' component='div' className='error' />
                    </div>

                    <div className='input-field'>
                        <span className='title'>Email </span>
                        <Field type='text' name='email' className='field' />
                        <ErrorMessage name='email' component='div' className='error' />
                    </div>

                    <div className='input-field'>
                        <span className='title'>Phone </span>
                        <Field type='text' name='phone' className='field' />
                        <ErrorMessage name='phone' component='div' className='error' />
                    </div>

                    <button type='submit' className='submit-btn'>
                        Submit
                    </button>
                </Form>
            </Formik>

            {isFormSubmitted && (
                <div className='success'>
                    Form submitted successfully!
                </div>
            )}
        </div>
    );
}
