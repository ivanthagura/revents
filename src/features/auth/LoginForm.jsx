import { Formik } from 'formik';
import React from 'react';
import ModalWrapper from '../../app/common/modals/ModalWrapper';
import * as Yup from 'yup';
import { Button, Form } from 'semantic-ui-react';
import CustomTextInput from '../../app/common/form/CustomTextInput';
import { useDispatch } from 'react-redux';
import { signInUser } from './authActions';
import { closeModal } from '../../app/common/modals/modalReducer';

export default function LoginForm() {
    const dispatch = useDispatch();

    return (
        <ModalWrapper size='mini' header='Sign in to Re-vents'>
            <Formik
                initialValues={{email: '', password: ''}}
                validationSchema={Yup.object({
                    email:Yup.string().required().email(),
                    password:Yup.string().required()
                })}
                onSubmit={(values, {setSubmitting}) => {
                    dispatch(signInUser(values));
                    setSubmitting(false);
                    dispatch(closeModal());
                }}
            >
                {({isSubmitting, isValid, dirty}) => (
                    <Form className='ui form'>
                        <CustomTextInput name='email' placeholder='Email Address'/>
                        <CustomTextInput name='password' placeholder='Password' type='password'/>
                        <Button
                            loading={isSubmitting}
                            disabled={!isValid || !dirty || isSubmitting}
                            type='submit'
                            fluid
                            size='large'
                            color='teal'
                            content='Login'
                        />
                    </Form>
                )}
            </Formik>
        </ModalWrapper>
    );
}