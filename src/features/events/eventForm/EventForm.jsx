import cuid from 'cuid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Header, Segment } from 'semantic-ui-react';
import { createEvent, updateEvent } from '../eventActions';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomTextInput from '../../../app/common/form/CustomTextInput';
import CustomTextArea from '../../../app/common/form/CustomTextArea';
import CustomSelectInput from '../../../app/common/form/CustomSelectInput';
import { categoryData } from '../../../app/api/categoryData';
import CustomDateInput from '../../../app/common/form/CustomDateInput';

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: '',
    category: '',
    description: '',
    city: '',
    venue: '',
    date: '',
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('You must provide a title'),
    category: Yup.string().required('You must provide a category'),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: 'Bob',
                  attendees: [],
                  hostPhotoURL: '/assets/user.png',
                })
              );
          history.push('/events');
        }}
      >
        {({ isSubmitting, dirty, isValid }) => (
          <Form className='ui form'>
            <Header sub color='teal' content={'Event Details'} />
            <CustomTextInput name='title' placeholder='Event title' />
            <CustomSelectInput
              name='category'
              placeholder='Category'
              options={categoryData}
            />
            <CustomTextArea
              name='description'
              placeholder='Description'
              rows={3}
            />
            <Header sub color='teal' content={'Event Location Details'} />
            <CustomTextInput name='city' placeholder='City' />
            <CustomTextInput name='venue' placeholder='Venue' />
            <CustomDateInput
              name='date'
              placeholderText='Event Date'
              timeFormat='HH:mm'
              showTimeSelect
              timeCaption='time'
              dateFormat='MMMM d, yyyy h:mm a'
            />

            <Button
              loading={isSubmitting}
              disabled={!isValid || !dirty || isSubmitting}
              type='submit'
              floated='right'
              positive
              content='Submit'
            />
            <Button
              disabled={isSubmitting}
              type='submit'
              floated='right'
              content='Cancel'
              as={Link}
              to='events'
            />
          </Form>
        )}
      </Formik>
    </Segment>
  );
}
