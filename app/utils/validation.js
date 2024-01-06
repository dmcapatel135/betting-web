import * as yup from 'yup';
import React from 'react';
import { isYupError, parseYupError } from './yup';
import { emailRegex } from './regex';

export const validateData = async (schema, data) => {
  return await schema
    .validate(data, {
      abortEarly: false,
    })
    .then(() => [true, null])
    .catch((err) => {
      if (isYupError(err)) {
        return [false, parseYupError(err)];
      }
      console.error(err);
      return [false, null];
    });
};

export const renderError = (error = '') => {
  if (error)
    return (
      <div className="text-[#FF0000] mt-1 text-12">
        <span className="text-[#FF0000]">{error}</span>
      </div>
    );
};

export const emailValidation = yup.object({
  email: yup
    .string()
    .required('Please enter email address')
    .matches(emailRegex, 'Please enter valid email.'),
});
