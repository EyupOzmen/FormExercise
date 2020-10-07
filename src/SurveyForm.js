import React, { useState} from "react";

import FormHandler from "./formHandler";

import { requiredValidation, minimumValidation,maximumValidation } from "./validations";
const SurveyForm = () => {
  
  const FIELDS = {
    validationType: {
      value: "integer",
      validations: [requiredValidation]
    },
    data: {
      value: undefined,
      validations: [requiredValidation, minimumValidation(3),maximumValidation(10)]
    },
    min:{
      value:3,
      validations:[requiredValidation]
    },
    max:{
      value:10,
      validations:[requiredValidation]
    },
    shape:{
      step:null,
      pattern:"",
      validations:[requiredValidation]
    }
  };

  const {
    fields,
    isSubmittable,
    isSubmitting,
    handleChange,
    handleSubmit
  } = FormHandler(FIELDS);

 
  return (
    <>
      <h1>Survey Form</h1>
     

      <form noValidate onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="">
            Validation Type
          </label>
          <div>
          <select 
             value={fields.validationType.value}
             onChange={handleChange}
             id="validation"
             name="validationType"
          >  
            <option value="integer">Integer</option>
            <option value="integer-range">Integer Range</option>
            <option value="decimal">Decimal</option>
            <option value="decimal-range">Decimal Range</option>
          </select>
          </div>
          <br/>
          {fields.validationType.value === "integer-range" || fields.validationType.value === "decimal-range" ?
          (<div md={6}>
          <input
            aria-describedby="minimumHelp"
            autoComplete="off"
            className="form-control"
            id="min"
            name="min"
            type="number"
            pattern={fields.shape.pattern}
            step={fields.shape.step}
            inputMode="numeric"
            onChange={handleChange}
            value={fields.min.value}
            placeholder="Minimum"
          />
          <small id="dataErrors" className="form-text text-danger">
         {fields.min.errors &&
           fields.min.errors.map((error) => (
             <span key={error}>
               {error}
               <br />
             </span>
           ))}
       </small>
          <br/>
          <input
            aria-describedby="maximumHelp"
            autoComplete="off"
            className="form-control"
            id="max"
            name="max"
            type="number"
            pattern={fields.shape.pattern}
            step={fields.shape.step}
            inputMode="numeric"
            onChange={handleChange}
            value={fields.max.value}
            placeholder="Maximum"
          />
         <small id="dataErrors" className="form-text text-danger">
         {fields.max.errors &&
           fields.max.errors.map((error) => (
             <span key={error}>
               {error}
               <br />
             </span>
           ))}
       </small>
        </div>
        )
        :(null)
        }
        </div>

        <div className="form-group">
          <label htmlFor="data" className="">
           Data Entry
          </label>
          <input
            aria-describedby="dataHelp"
            autoComplete="off"
            className="form-control"
            id="data"
            name="data"
            type="number"
            pattern={fields.shape.pattern}
            step={fields.shape.step}
            inputMode="numeric"
            onChange={handleChange}
            value={fields.data.value}
            placeholder="Enter data"
          />
          <small id="dataHelp" className="form-text text-muted">
            We'll never share your data with anyone else.
          </small>
          <small id="dataErrors" className="form-text text-danger">
            {fields.data.errors &&
              fields.data.errors.map((error) => (
                <span key={error}>
                  {error}
                  <br />
                </span>
              ))}
          </small>
        </div>
        <button
          className="btn btn-primary"
          type="submit"
          disabled={isSubmitting || !isSubmittable}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default SurveyForm;