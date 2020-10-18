import { useField } from 'formik';
import React from 'react';
import { FormField, Label, Select } from 'semantic-ui-react';

export default function CustomSelectInput({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  return (
    <FormField error={meta.touched && !!meta.error}>
      <label>{label}</label>
      <Select
        clearable
        value={field.value || null}
        onChange={(e, data) => helpers.setValue(data.value)}
        onBlur={() => helpers.setTouched(true)}
        {...props}
      />
      {meta.touched && meta.error ? (
        <Label basic color='red'>
          {meta.error}
        </Label>
      ) : null}
    </FormField>
  );
}
