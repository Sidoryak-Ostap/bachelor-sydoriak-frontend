import React, { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
import { capitalizeFirstLetter } from '../utils/format';

type FormInputProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  labelStyles?: string;
  inputStyles?: string;
  error?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (
    { label, name, type = 'text', placeholder, icon, error, labelStyles, inputStyles, ...rest },
    ref
  ) => {
    return (
      <div className="w-full ">
        {label && (
          <label
            className={`block text-base font-medium text-gray-700 mb-1 ${labelStyles}`}
            htmlFor={name}
          >
            {label}
          </label>
        )}

        <div className="w-full">
          <div
            className={`flex items-center gap-2 bg-[#EAF0EF] rounded-[10px] py-2 px-4 w-full border ${
              error ? 'border-red-500' : 'border-transparent'
            } transition-colors duration-200`}
          >
            {icon && <div>{icon}</div>}
            <input
              id={name}
              name={name}
              type={type}
              placeholder={placeholder}
              ref={ref}
              className={`w-full bg-transparent text-black placeholder:text-[#B0B0B0] focus:outline-none ${inputStyles}`}
              {...rest}
            />
          </div>
          {error && (
            <span className="text-red-500 text-base mt-1">
              {capitalizeFirstLetter(error.message || '')}
            </span>
          )}
        </div>
      </div>
    );
  }
);

export default FormInput;
