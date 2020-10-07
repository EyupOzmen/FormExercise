import React, { useState,useEffect } from "react";

import { minimumValidation,maximumValidation } from "./validations";

export default function FormHandler(FIELDS) {
  const [fields, setFields] = useState(FIELDS);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmittable, setIsSubmittable] = useState(false);

 

  const handleSubmit = (event) => {
    setIsSubmitting(true);
    event.preventDefault();

    setTimeout(() => {
      console.log(fields);
      setFields({})
      setIsSubmitting(false);
    }, 2000);
  };


  const handleChange = (event) => {
    const { value, name } = event.target;

    if(name === "validationType"){
      if(value === "integer" || value === "integer-range"){
        fields.shape.step=1
        fields.shape.pattern= "[0-9]*"
        
      }else{
        fields.shape.step=0.1
        fields.shape.pattern= "[0-9]+([,][0-9]+)?" 
      }
    }

    if(name === "min"){
      minimumValidation(value)
    }
    if(name === "max"){
      maximumValidation(value)
    }
    console.log(fields.shape.step);
    console.log(fields.shape.pattern);
    let newFields = { ...fields };
    newFields[name].value = value;
    newFields = setValidationErrors(newFields);
    setIsSubmittable(!hasErrors(newFields));
    setFields(newFields);
  };


  const hasErrors = (fields) => {
    return (
      Object.keys(fields)
        .map((field) => fields[field].errors.length)
        .reduce((acc, errorCount) => acc + errorCount, 0) > 0
    );
  };

  const setValidationErrors = (fields) => {
    Object.keys(fields).forEach((field) => {
      fields[field].errors = errorsForField(field);
    });

    return fields;
  };

  const errorsForField = (field) => {
    return fields[field].validations
      .map((validation) => {
         const {isValid,message} = validation(fields[field].value)
         return isValid ? '':message})
      .filter((value) => value.length > 0);
  };

  return {
    fields,
    isSubmittable,
    isSubmitting,
    handleChange,
    handleSubmit
  };
}