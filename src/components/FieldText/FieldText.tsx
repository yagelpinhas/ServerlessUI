
import React from 'react';
import { ErrorMessage, useField } from 'formik';
import "./FieldText.css"

export const FieldText = ({ label, ...props }: any) => {
    const [field, meta] = useField(props);
    return (
      <span className="mb-2">
        
        <label htmlFor={field.name} className="label">{label}</label>
        <div></div>
        <input
          className={`form-control shadow-none ${meta.touched && meta.error && 'is-invalid '}`}
          {...field} {...props}
          autoComplete="off"
          data-testid={props.testid}
          placeholder={label}
          type={props.name=="Password"? "password": ""}
        />
        <ErrorMessage component="div" name={field.name} className="error" />
      </span>
    )
}