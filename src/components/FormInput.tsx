import React, { forwardRef } from 'react';
import type { FieldError } from 'react-hook-form';
import { capitalizeFirstLetter } from '../utils/format';

type FormInputProps = {
  label?: string;
  name: string;
  type?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  error?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, name, type = 'text', placeholder, icon, error, ...rest }, ref) => {
    return (
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
            className="w-full bg-transparent text-black placeholder:text-[#B0B0B0] focus:outline-none"
            {...rest}
          />
        </div>
        {error && (
          <span className="text-red-500 text-base mt-1">
            {capitalizeFirstLetter(error.message || '')}
          </span>
        )}
      </div>
    );
  }
);

export default FormInput;
